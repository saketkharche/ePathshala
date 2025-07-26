import os
import sys
import datetime

def get_spring_boot_files(root_dir):
    spring_extensions = ['.java', '.properties', '.yml', '.yaml', '.xml',
                         '.gradle', '.kts', '.html', '.css', '.js',
                         '.jsx', '.tsx', '.json', '.sql', '.md', '.txt']

    important_files = ['pom.xml', 'build.gradle', 'application.properties',
                       'application.yml', 'bootstrap.yml', 'application-dev.yml',
                       'logback-spring.xml', 'SpringBootApplication.java',
                       'HospitalManagementSystemApplication.java', 'package.json',
                       'tsconfig.json', 'webpack.config.js', 'vite.config.js']

    skip_dirs = {'target', 'build', 'node_modules', '.git', '.idea', 'bin', 'logs', 'dist', 'out'}

    spring_files = []
    for dirpath, dirnames, filenames in os.walk(root_dir):
        dirnames[:] = [d for d in dirnames if d not in skip_dirs]
        for filename in filenames:
            if (any(filename.endswith(ext) for ext in spring_extensions) or
                filename in important_files):
                full_path = os.path.join(dirpath, filename)
                spring_files.append(full_path)

    spring_files.sort(key=lambda x: (os.path.splitext(x)[1], x))
    return spring_files

def write_combined_code(output_path, code_files, root_dir):
    try:
        with open(output_path, 'w', encoding='utf-8') as outfile:
            outfile.write(f"{'=' * 100}\n")
            outfile.write("HOSPITAL MANAGEMENT SYSTEM - SPRING BOOT, REACT, MYSQL CODE\n")
            outfile.write(f"Project Path: {root_dir}\n")
            outfile.write(f"Generated on: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            outfile.write(f"{'=' * 100}\n\n")

            for code_file in code_files:
                rel_path = os.path.relpath(code_file, root_dir)
                separator = f"\n\n{'=' * 100}\n// File: {rel_path}\n{'=' * 100}\n\n"
                try:
                    with open(code_file, 'r', encoding='utf-8') as infile:
                        outfile.write(separator + infile.read())
                except Exception as e:
                    outfile.write(separator + f"[ERROR reading file: {str(e)}]\n")
        return True
    except Exception as e:
        print(f"\nERROR: Failed to write output file: {str(e)}")
        print(f"Attempted to write to: {os.path.abspath(output_path)}")
        return False

def main():
    print(f"{'=' * 60}")
    print(" SPRING BOOT, REACT, MYSQL CODE EXTRACTOR - HOSPITAL MANAGEMENT SYSTEM")
    print(f"{'=' * 60}\n")
    print("Please enter the path to the project directory")
    print("Example: C:\\Users\\YourName\\Projects\\hospital-management-system")
    
    while True:
        root_directory = input("\nEnter project directory path: ").strip()
        if not root_directory:
            print("ERROR: Path cannot be empty. Please try again.")
            continue
        if not os.path.isdir(root_directory):
            print(f"ERROR: Directory not found: {root_directory}")
            continue
        break

    print("\nPlease enter the output file name (e.g., output.txt)")
    print("NOTE: It will be saved in the same folder you provided.")

    while True:
        output_filename = input("\nEnter output file name: ").strip()
        if not output_filename:
            print("ERROR: File name cannot be empty. Please try again.")
            continue
        if not output_filename.endswith('.txt'):
            output_filename += '.txt'
        break

    output_path = os.path.join(root_directory, output_filename)

    print("\nScanning project structure...")
    project_files = get_spring_boot_files(root_directory)

    if not project_files:
        print("No relevant files found in the specified directory.")
        keep_open()
        return

    print(f"\nFound {len(project_files)} relevant files:")
    print(f"• Java files: {len([f for f in project_files if f.endswith('.java')])}")
    print(f"• React files: {len([f for f in project_files if f.endswith(('.js', '.jsx', '.tsx'))])}")
    print(f"• MySQL files: {len([f for f in project_files if f.endswith('.sql')])}")
    print(f"• Config files: {len([f for f in project_files if f.endswith(('.properties', '.yml', '.yaml'))])}")
    print(f"• Build files: {len([f for f in project_files if f.endswith(('.xml', '.gradle', '.kts'))])}")

    print(f"\nAttempting to write output to:\n{output_path}")

    if write_combined_code(output_path, project_files, root_directory):
        print("\n✅ Operation completed successfully!")
        print(f"📄 Output file created at: {output_path}")
        print(f"📦 File size: {os.path.getsize(output_path)/1024:.2f} KB")
    else:
        print("\n❌ Failed to create output file.")

    keep_open()

def keep_open():
    if os.name == 'nt':
        print("\nPress Enter to exit...")
        input()

if __name__ == "__main__":
    main()
