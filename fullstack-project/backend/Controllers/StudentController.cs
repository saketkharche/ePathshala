using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace Backend.Controllers
{
   
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Student")]
    public class StudentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StudentController(ApplicationDbContext context)
        {
            _context = context;
        }

       
        private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        
        [HttpGet("grades")]
        public async Task<IActionResult> GetGrades()
        {
            var id = GetUserId();
            var grades = await _context.Grades
                .Where(g => g.StudentId == id)
                .Select(g => new { g.Id, g.Subject, g.Marks })
                .ToListAsync();
            return Ok(grades);
        }

        
        [HttpGet("marks")]
        public Task<IActionResult> GetMarks()
        {
            return GetGrades();
        }

        
        [HttpGet("assignments")]
        public async Task<IActionResult> GetAssignments()
        {
            var id = GetUserId();
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }
            var assignments = await _context.Assignments
                
                .Where(a => a.Class == student.Class && a.TeacherId == student.TeacherId)
                .Select(a => new
                {
                    a.Id,
                    a.Title,
                    a.DueDate,
                    a.Subject,
                    ClassName = a.Class,
                    a.FilePath
                }).ToListAsync();
            return Ok(assignments);
        }

       
        [HttpGet("attendance")]
        public async Task<IActionResult> GetAttendance()
        {
            var id = GetUserId();
            var attendance = await _context.Attendances
                .Where(a => a.StudentId == id)
                .Select(a => new { a.Date, a.Status, a.TeacherId })
                .ToListAsync();
            return Ok(attendance);
        }

        
        [HttpGet("leaves")]
        public async Task<IActionResult> GetLeaves()
        {
            var id = GetUserId();
            var leaves = await _context.LeaveRequests
                .Where(l => l.StudentId == id)
                .Select(l => new
                {
                    l.Id,
                    l.Reason,
                    l.StartDate,
                    l.EndDate,
                    l.TeacherApproval,
                    l.ParentApproval,
                    l.FinalStatus
                }).ToListAsync();
            return Ok(leaves);
        }

       
        [HttpPost("leave")]
        public async Task<IActionResult> CreateLeave([FromBody] LeaveRequestDto dto)
        {
            if (dto == null)
            {
                return BadRequest("Invalid request.");
            }
            
            var id = GetUserId();
            var leave = new LeaveRequest
            {
                StudentId = id,
                Reason = dto.Reason,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                TeacherApproval = ApprovalStatus.Pending,
                ParentApproval = ApprovalStatus.Pending,
                FinalStatus = ApprovalStatus.Pending
            };
            _context.LeaveRequests.Add(leave);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Leave request submitted.", leave.Id });
        }

        
        [HttpPost("assignments/{id}/submit")]
        public async Task<IActionResult> SubmitAssignment(int id, [FromForm] IFormFile file)
        {
            var studentId = GetUserId();
            var assignment = await _context.Assignments.FindAsync(id);
            if (assignment == null)
            {
                return NotFound(new { message = "Assignment not found." });
            }
            if (file == null || file.Length == 0)
            {
                return BadRequest(new { message = "No file uploaded." });
            }
           
            var submissionsDir = Path.Combine(Directory.GetCurrentDirectory(), "uploads", "submissions");
            if (!Directory.Exists(submissionsDir))
            {
                Directory.CreateDirectory(submissionsDir);
            }
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(submissionsDir, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            var relativePath = Path.Combine("uploads", "submissions", fileName);
            var submission = new AssignmentSubmission
            {
                AssignmentId = id,
                StudentId = studentId,
                FilePath = relativePath,
                SubmittedAt = DateTime.UtcNow
            };
            _context.AssignmentSubmissions.Add(submission);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Assignment submitted.", submission.Id });
        }

        
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var id = GetUserId();
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }
            return Ok(new
            {
                student.Name,
                student.Email,
                student.AccountNumber,
                student.Class,
                Role = student.Role
            });
        }
    }
}