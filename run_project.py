import subprocess
import os
import time

backend_path = os.path.abspath('backend')
frontend_path = os.path.abspath('frontend')

# Function to run a command in a new terminal
def run_in_terminal(command, cwd):
    if os.name == 'nt':  # For Windows
        subprocess.Popen(['start', 'cmd', '/k', command], cwd=cwd, shell=True)
    else:  # For Unix-based systems
        subprocess.Popen(['gnome-terminal', '--', 'bash', '-c', command], cwd=cwd)

# Run main.py in a new terminal
run_in_terminal('python main.py', backend_path)

# Wait a bit to ensure the backend starts first
time.sleep(5)

# Run frontend in a new terminal
run_in_terminal('npm install && npm run dev', frontend_path)