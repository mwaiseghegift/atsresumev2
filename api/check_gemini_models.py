"""
Quick diagnostic script to check available Gemini models
"""
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

api_key = os.getenv('GEMINI_API_KEY')

if not api_key:
    print("❌ GEMINI_API_KEY not found in .env file")
    exit(1)

print(f"✅ API Key found: {api_key[:10]}...{api_key[-4:]}")
print("\n🔍 Configuring Gemini API...")

try:
    genai.configure(api_key=api_key)
    print("✅ API configured successfully\n")
    
    print("📋 Available Gemini Models:")
    print("-" * 60)
    
    models = genai.list_models()
    gemini_models = [m for m in models if 'gemini' in m.name.lower()]
    
    if not gemini_models:
        print("⚠️  No Gemini models found!")
    else:
        for model in gemini_models:
            print(f"\n✅ {model.name}")
            print(f"   Display Name: {model.display_name}")
            print(f"   Description: {model.description[:80]}..." if len(model.description) > 80 else f"   Description: {model.description}")
            print(f"   Supported Methods: {', '.join(model.supported_generation_methods)}")
    
    print("\n" + "="*60)
    print("💡 Recommended models for generateContent:")
    recommended = [m for m in gemini_models if 'generateContent' in m.supported_generation_methods]
    for model in recommended:
        print(f"   • {model.name}")
    
except Exception as e:
    print(f"❌ Error: {str(e)}")
    print("\n💡 Possible issues:")
    print("   1. Invalid API key")
    print("   2. Network connectivity issues")
    print("   3. API access restrictions")
