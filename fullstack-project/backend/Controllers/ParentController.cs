using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Parent")]
    public class ParentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ParentController(ApplicationDbContext context)
        {
            _context = context;
        }

        private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

       
        [HttpGet("attendance")]
        public async Task<IActionResult> GetAttendance()
        {
            var parentId = GetUserId();
            var childrenIds = await _context.Students
                .Where(s => s.ParentId == parentId)
                .Select(s => s.Id)
                .ToListAsync();
            var attendance = await _context.Attendances
                .Where(a => childrenIds.Contains(a.StudentId))
                .Select(a => new { a.StudentId, a.Date, a.Status, a.TeacherId })
                .ToListAsync();
            return Ok(attendance);
        }

        
        [HttpGet("grades")]
        public async Task<IActionResult> GetGrades()
        {
            var parentId = GetUserId();
            var childrenIds = await _context.Students
                .Where(s => s.ParentId == parentId)
                .Select(s => s.Id)
                .ToListAsync();
            var grades = await _context.Grades
                .Where(g => childrenIds.Contains(g.StudentId))
                .Select(g => new { g.StudentId, g.Subject, g.Marks })
                .ToListAsync();
            return Ok(grades);
        }

        [HttpGet("leaves")]
        public async Task<IActionResult> GetLeaves()
        {
            var parentId = GetUserId();
            var childrenIds = await _context.Students
                .Where(s => s.ParentId == parentId)
                .Select(s => s.Id)
                .ToListAsync();
            var leaves = await _context.LeaveRequests
                .Where(l => childrenIds.Contains(l.StudentId))
                .Include(l => l.Student)
                .Select(l => new
                {
                    l.Id,
                    l.StudentId,
                    StudentName = l.Student.Name,
                    l.Reason,
                    l.StartDate,
                    l.EndDate,
                    l.TeacherApproval,
                    l.ParentApproval,
                    l.FinalStatus
                })
                .ToListAsync();
            return Ok(leaves);
        }

        
        [HttpGet("marks")]
        public Task<IActionResult> GetMarks()
        {
            return GetGrades();
        }

        
        /// </summary>
        [HttpPut("leave/{id}/parent-approval")]
        public async Task<IActionResult> ApproveLeave(int id, [FromQuery] bool approve)
        {
            var leave = await _context.LeaveRequests.FindAsync(id);
            if (leave == null)
            {
                return NotFound();
            }
            leave.ParentApproval = approve ? ApprovalStatus.Approved : ApprovalStatus.Rejected;
            // Update final status
            if (leave.ParentApproval == ApprovalStatus.Approved && leave.TeacherApproval == ApprovalStatus.Approved)
            {
                leave.FinalStatus = ApprovalStatus.Approved;
            }
            else if (leave.ParentApproval == ApprovalStatus.Rejected || leave.TeacherApproval == ApprovalStatus.Rejected)
            {
                leave.FinalStatus = ApprovalStatus.Rejected;
            }
            await _context.SaveChangesAsync();
            return Ok(new { message = "Leave request updated.", leave.FinalStatus });
        }

        
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var parentId = GetUserId();
            var parent = await _context.Parents.FindAsync(parentId);
            if (parent == null)
            {
                return NotFound();
            }
            var childrenIds = await _context.Students
                .Where(s => s.ParentId == parentId)
                .Select(s => s.Id)
                .ToListAsync();
            return Ok(new
            {
                parent.Name,
                parent.Email,
                parent.AccountNumber,
                Role = parent.Role,
                Children = childrenIds
            });
        }
    }
}