import os
import zipfile
import fnmatch

def compress_project():
    # Root directory is the parent of scratch/
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    zip_name = "project_vercel_ready.zip"
    zip_path = os.path.join(root_dir, zip_name)
    
    # Exclude directories
    exclude_dirs = {
        'node_modules', '.git', '.vscode', 'dist', '__pycache__', '.idea', '.next'
    }
    
    # Exclude file extensions or exact filenames
    exclude_files = {
        '.env', '.env.local', '.env.development.local', '.env.test.local', '.env.production.local',
        'project_vercel_ready.zip', '.DS_Store', '*.pyc', '*.pyo'
    }

    print(f"Starting compression from root: {root_dir}")
    print(f"Output ZIP file: {zip_path}")
    
    count = 0
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(root_dir):
            # Modify dirs in-place to skip excluded directories in subfolders as well
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            
            for file in files:
                # Check if file should be excluded
                exclude = False
                if file in exclude_files:
                    exclude = True
                else:
                    for pattern in exclude_files:
                        if fnmatch.fnmatch(file, pattern):
                            exclude = True
                            break
                
                if exclude:
                    continue
                
                file_path = os.path.join(root, file)
                # Calculate relative path for the zip archive
                rel_path = os.path.relpath(file_path, root_dir)
                
                zipf.write(file_path, rel_path)
                count += 1
                
    print(f"\nCompression complete! Added {count} files.")
    print(f"Created: {zip_path}")

if __name__ == '__main__':
    compress_project()
