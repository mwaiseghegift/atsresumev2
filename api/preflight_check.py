"""
Pre-flight check script - Run this before starting the application
This script checks if everything is configured correctly
"""

import os
import sys
from pathlib import Path

def check_environment():
    """Check if .env file exists and has necessary variables"""
    print("🔍 Checking environment configuration...")
    
    env_path = Path(__file__).parent / '.env'
    
    if not env_path.exists():
        print("❌ .env file not found!")
        print("\n📝 Creating .env file from template...")
        
        example_path = Path(__file__).parent / '.env.example'
        if example_path.exists():
            import shutil
            shutil.copy(example_path, env_path)
            print("✅ .env file created!")
        else:
            with open(env_path, 'w') as f:
                f.write("GEMINI_API_KEY=\n")
            print("✅ .env file created!")
        
        print("\n⚠️  IMPORTANT: You need to add your Gemini API key!")
        print("1. Get your free API key from: https://makersuite.google.com/app/apikey")
        print("2. Open the .env file and replace 'your_gemini_api_key_here' with your actual key")
        print("3. Run this check again after adding your key")
        return False
    
    # Load .env file
    from dotenv import load_dotenv
    load_dotenv()
    
    gemini_key = os.getenv('GEMINI_API_KEY')
    
    if not gemini_key or gemini_key == 'your_gemini_api_key_here':
        print("❌ GEMINI_API_KEY is not set or still has placeholder value!")
        print("\n⚠️  IMPORTANT: You need to add your Gemini API key!")
        print("1. Get your free API key from: https://makersuite.google.com/app/apikey")
        print("2. Open the .env file and set: GEMINI_API_KEY=your_actual_key")
        print("3. Run this check again after adding your key")
        return False
    
    print("✅ .env file exists and GEMINI_API_KEY is set!")
    return True

def check_packages():
    """Check if required packages are installed"""
    print("\n🔍 Checking installed packages...")
    
    required_packages = [
        'django',
        'djangorestframework',
        'google.generativeai',
        'corsheaders',
        'dotenv'
    ]
    
    missing = []
    for package in required_packages:
        try:
            if package == 'google.generativeai':
                import google.generativeai
            elif package == 'dotenv':
                import dotenv
            else:
                __import__(package)
            print(f"  ✅ {package}")
        except ImportError:
            print(f"  ❌ {package} - NOT INSTALLED")
            missing.append(package)
    
    if missing:
        print(f"\n❌ Missing packages: {', '.join(missing)}")
        print("\n💡 Install them with:")
        print("   pip install -r requirements.txt")
        return False
    
    print("✅ All required packages are installed!")
    return True

def check_migrations():
    """Check if migrations are up to date"""
    print("\n🔍 Checking database migrations...")
    
    db_path = Path(__file__).parent / 'db.sqlite3'
    
    if not db_path.exists():
        print("⚠️  Database not found!")
        print("\n💡 Run migrations with:")
        print("   python manage.py migrate")
        return False
    
    # Check if core app migrations exist
    migrations_path = Path(__file__).parent / 'core' / 'migrations' / '0001_initial.py'
    
    if not migrations_path.exists():
        print("⚠️  Core app migrations not found!")
        print("\n💡 Create migrations with:")
        print("   python manage.py makemigrations")
        print("   python manage.py migrate")
        return False
    
    print("✅ Database and migrations look good!")
    return True

def check_port():
    """Check if port 8000 is available"""
    print("\n🔍 Checking if port 8000 is available...")
    
    import socket
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex(('localhost', 8000))
    sock.close()
    
    if result == 0:
        print("⚠️  Port 8000 is already in use!")
        print("💡 Either:")
        print("   - Stop the process using port 8000")
        print("   - Run Django on a different port: python manage.py runserver 8001")
        return False
    
    print("✅ Port 8000 is available!")
    return True

def main():
    print("="*70)
    print("🚀 ATS Resume API - Pre-flight Check")
    print("="*70)
    
    checks = [
        ("Environment Variables", check_environment),
        ("Python Packages", check_packages),
        ("Database Migrations", check_migrations),
        ("Port Availability", check_port)
    ]
    
    results = []
    for name, check_func in checks:
        try:
            result = check_func()
            results.append(result)
        except Exception as e:
            print(f"\n❌ Error during {name} check: {str(e)}")
            results.append(False)
    
    print("\n" + "="*70)
    
    if all(results):
        print("✅ All checks passed! You're ready to start the server!")
        print("\n🚀 Start the server with:")
        print("   python manage.py runserver")
        print("\n📚 Or run the API tests:")
        print("   python test_api.py")
    else:
        print("⚠️  Some checks failed. Please fix the issues above.")
        print("\n📚 See GETTING_STARTED.md for detailed setup instructions")
    
    print("="*70 + "\n")
    
    return all(results)

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
