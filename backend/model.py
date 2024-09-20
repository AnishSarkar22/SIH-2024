import openai
import time
import sys

# Replace with your actual API key
client = openai.OpenAI(api_key='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')

def get_gpt4o(messages, max_tokens=1000):
    try:
        response = client.chat.completions.create(
            model="gpt-4o",  # Using GPT-4o model
            messages=messages,
            max_tokens=max_tokens,
            n=1,
            temperature=0.7,
            stream=True,  # Enable streaming
        )
        return response
    except openai.RateLimitError:
        print("Rate limit exceeded. Waiting for 60 seconds before retrying.")
        time.sleep(60)
        return get_gpt4o(messages, max_tokens)
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def classify_query(user_input):
    messages = [
        {"role": "system", "content": "You are a helpful career and education advisor."},
        {"role": "user", "content": f"""Classify the following query as either 'career', 'education', or 'other'. 
        If the query is about job changes, career paths, professional development, or specific industries (including gaming), classify it as 'career'.
        If the query is about learning, courses, or academic pursuits, classify it as 'education'.
        Only use 'other' if the query is completely unrelated to career or education.
        Respond with just the classification word.
        Query: {user_input}
        Classification:"""}
    ]
    response = get_gpt4o(messages, max_tokens=10)
    classification = ""
    for chunk in response:
        if chunk.choices[0].delta.content is not None:
            classification += chunk.choices[0].delta.content
    return classification.lower().strip()

def print_response(response):
    full_response = ""
    for chunk in response:
        if chunk.choices[0].delta.content is not None:
            content = chunk.choices[0].delta.content
            full_response += content
            print(content, end='', flush=True)
            time.sleep(0.02)  # Adjust this value to change the typing speed
    print("\n")
    return full_response

def interactive_guidance(user_input, query_type):
    messages = [
        {"role": "system", "content": "You are a helpful career and education advisor. Provide detailed guidance and ask follow-up questions to ensure all aspects of the user's query are addressed."},
        {"role": "user", "content": user_input}
    ]

    while True:
        response = get_gpt4o(messages, max_tokens=2000)
        ai_response = print_response(response)
        
        messages.append({"role": "assistant", "content": ai_response})
        
        if "Do you have any more questions or concerns?" not in ai_response:
            messages.append({"role": "user", "content": "Please ask if the user has any more questions or concerns about this topic."})
            continue
        
        user_follow_up = input("Your response (or type 'done' to finish this topic): ")
        
        if user_follow_up.lower() == 'done':
            break
        
        messages.append({"role": "user", "content": user_follow_up})

def main():
    print("Welcome to your personal assistant!")
    print("Ask any question related to career or education. Type 'quit' to exit.")

    while True:
        user_question = input("\nWhat's your question? ")
        
        if user_question.lower() == 'quit':
            break
        
        query_type = classify_query(user_question)
        
        if query_type in ['career', 'education']:
            print("\nHere's your guidance:\n")
            interactive_guidance(user_question, query_type)
        else:
            print("\nI'm sorry, but I can only provide career or educational guidance. Could you please ask a question related to these topics?")

if __name__ == "__main__":
    main()