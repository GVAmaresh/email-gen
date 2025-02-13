# Email Generator Application
### Overview
This application generates professional emails based on user inputs. It includes:

* A FastAPI backend to process email generation

* A Next.js frontend for user interaction

### Features
* Generate emails based on purpose, recipient name, and key points.

* Uses LangChain and Mistral AI for email generation.

* Handles errors and missing fields gracefully.

---

### Project Structure

```
api/
│   └── python/
│       ├── app.py     # FastAPI backend     
│       └── requirements.txt 
|
|
app/            # Frontend Next.js  
|  ├── page.tsx     
components/
|   └──Form/
|       ├── Form.tsx
|
├──.env
├──.example.env
├── package.json    
```

---

### Environment Variables
Create a .env file with the following:
``` bash
MISTRAL_API_KEY=your_api_key_here
```
Refer more : 
* [https://python.langchain.com/docs/integrations/chat/](https://python.langchain.com/docs/integrations/chat/)
* [https://console.mistral.ai/api-keys/](https://console.mistral.ai/api-keys/)

---

### Installation

Backend (FastAPI)

1. Navigate to the backend directory:

```bash
cd api/python
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run the FastAPI server:

``` bash
python app.py
```

### Frontend (Next.js)

1. Install dependencies:
 ``` bash
npm i
 ```

2. Start the Next.js development server:

``` bash
npm run dev
```
 ---
### Usage

1. Open the frontend in your browser at http://localhost:3000
2. Fill in the form with recipient name, email purpose, and key points.

3. Submit the form to generate a professional email.

---

### License

This project is licensed under the [MIT License](https://github.com/GVAmaresh/email-gen/blob/main/LICENSE)