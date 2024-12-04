import os
from dotenv import load_dotenv

load_dotenv()
# 获取环境变量GATEWAY_IP
GATEWAY_IP = os.getenv("GATEWAY_IP", "localhost")
# LOG_FORMAT = "%(levelname) -5s %(asctime)s" "-1d: %(message)s"
# logger = logging.getLogger()
# logger.setLevel(logging.INFO)
# logging.basicConfig(format=LOG_FORMAT)
# 获取项目根目录
# 获取当前脚本的绝对路径
current_script_path = os.path.abspath(__file__)
root_path = os.path.dirname(os.path.dirname(os.path.dirname(current_script_path)))
UPLOAD_ROOT_PATH = os.path.join(root_path, "QANY_DB", "content")
IMAGES_ROOT_PATH = os.path.join(root_path, "qanything_kernel/qanything_server/dist/qanything/assets", "file_images")
print("UPLOAD_ROOT_PATH:", UPLOAD_ROOT_PATH)
print("IMAGES_ROOT_PATH:", IMAGES_ROOT_PATH)
OCR_MODEL_PATH = os.path.join(root_path, "qanything_kernel", "dependent_server", "ocr_server", "ocr_models")
RERANK_MODEL_PATH = os.path.join(root_path, "qanything_kernel", "dependent_server", "rerank_server", "rerank_models")
EMBED_MODEL_PATH = os.path.join(root_path, "qanything_kernel", "dependent_server", "embed_server", "embed_models")
PDF_MODEL_PATH = os.path.join(root_path, "qanything_kernel/dependent_server/pdf_parser_server/pdf_to_markdown")

# LLM streaming reponse
STREAMING = True

SYSTEM = """
K1/K3/K5 are the company’s space pod products. Detailed information about these products can be found in <DOCUMENTS> and </DOCUMENTS>.
You are the company’s customer service representative, and I am the customer currently making an inquiry to you.
Today's date is {{today_date}}. The current time is {{current_time}}.
"""

SYSTEM_CN = """
K1/K3/K5 都是公司的太空舱产品，具体产品的详细信息来自<DOCUMENTS>和</DOCUMENTS>；
你是公司的客服，我是客户，我现在正在向你咨询；
今天日期是 {{today_date}}. 现在的时间是 {{current_time}}.
"""

INSTRUCTIONS = """
- All contents between <DOCUMENTS> and </DOCUMENTS> are reference information retrieved from an external knowledge base.
- If the reference information does not contain an answer to the question, please immediately respond: "The retrieved reference information does not provide sufficient details.".
- Before answering, confirm the number of key points or pieces of information required, ensuring nothing is overlooked.
- Return your answer in Markdown formatting, Respond using the same language as the content between <QUESTION> and </QUESTION> .
- If the answer contains Chinese, please translate it into English and output only the English translation.
- Now, answer the following question based on the above retrieved documents:
{{question}}
"""

INSTRUCTIONS_CN = """
- <DOCUMENTS> 和 </DOCUMENTS> 之间的所有内容均为从外部知识库检索到的参考信息。
- 如果参考信息中不包含问题的答案，请立即回复：“检索到的参考信息并未提供充足的信息。”
- 在回答之前，请确认所需关键点或信息的数量，确保没有遗漏。
- 使用 Markdown 格式返回您的答案，并使用 <QUESTION> 和 </QUESTION> 之间的内容相同的语言作答。
- 现在，请根据以上检索到的文档回答以下问题：
{{question}}
"""

INSTRUCTIONS2 = """
- All contents between <DOCUMENTS> and </DOCUMENTS> are reference information retrieved from an external knowledge base.
- If you cannot answer based on the given information, you need to answer based on your own knowledge, And combined with the context, but don't make up anything. If it is beyond your knowledge, you can answer \"抱歉，已知的信息不足，因此无法回答。\".
- Before answering, confirm the number of key points or pieces of information required, ensuring nothing is overlooked.
- Now, answer the following question based on the above retrieved documents(Let's think step by step):
{{question}}
- Return your answer in Markdown formatting, and in the same language as the question "{{question}}".
"""

PROMPT_TEMPLATE = """
<SYSTEM>
{{system}}
</SYSTEM>

<DOCUMENTS>
{{context}}
</DOCUMENTS>

<QUESTION>
{{question}}
</QUESTION>

<INSTRUCTIONS>
{{instructions}}
</INSTRUCTIONS>
"""

CUSTOM_PROMPT_TEMPLATE = """
<USER_INSTRUCTIONS>
{{custom_prompt}}
</USER_INSTRUCTIONS>

<DOCUMENTS>
{{context}}
</DOCUMENTS>

<INSTRUCTIONS>
- All contents between <DOCUMENTS> and </DOCUMENTS> are reference information retrieved from an external knowledge base.
- Now, answer the following question based on the above retrieved documents(Let's think step by step):
{{question}}
</INSTRUCTIONS>
"""

SIMPLE_PROMPT_TEMPLATE = """
- You are a helpful assistant. You can help me by answering my questions. You can also ask me questions.
- Today's date is {{today}}. The current time is {{now}}.
- User's custom instructions: {{custom_prompt}}
- Before answering, confirm the number of key points or pieces of information required, ensuring nothing is overlooked.
- Now, answer the following question:
{{question}}
Return your answer in Markdown formatting, and in the same language as the question "{{question}}".
"""

SQL_PROMPT_TEMPLATE = """
Database Schema:
Tables:
1. KnowledgeBase (id, kb_id, user_id, kb_name, latest_qa_time, latest_insert_time)
2. User (id, user_id, user_name, creation_time)
3. File (id, file_id, user_id, kb_id, file_name, status, content_length, file_location, chunk_size)
4. QaLogs (id, qa_id, user_id, kb_ids, query, model, prompt, result, timestamp)

- 请仅返回sql语句
Question: {{question}}

SQL Query:
"""

# 缓存知识库数量
CACHED_VS_NUM = 100

# 文本分句长度
SENTENCE_SIZE = 100

# 知识库检索时返回的匹配内容条数
VECTOR_SEARCH_TOP_K = 30

VECTOR_SEARCH_SCORE_THRESHOLD = 0.3

KB_SUFFIX = '_240625'
# MILVUS_HOST_LOCAL = 'milvus-standalone-local'
# MILVUS_PORT = 19530
MILVUS_HOST_LOCAL = GATEWAY_IP
MILVUS_PORT = 19540
MILVUS_COLLECTION_NAME = 'qanything_collection' + KB_SUFFIX

# ES_URL = 'http://es-container-local:9200/'
ES_URL = f'http://{GATEWAY_IP}:9210/'
ES_USER = None
ES_PASSWORD = None
ES_TOP_K = 30
ES_INDEX_NAME = 'qanything_es_index' + KB_SUFFIX

# MYSQL_HOST_LOCAL = 'mysql-container-local'
# MYSQL_PORT_LOCAL = 3306
MYSQL_HOST_LOCAL = GATEWAY_IP
MYSQL_PORT_LOCAL = 3316
MYSQL_USER_LOCAL = 'root'
MYSQL_PASSWORD_LOCAL = '123456'
MYSQL_DATABASE_LOCAL = 'qanything'

LOCAL_OCR_SERVICE_URL = "localhost:7001"

LOCAL_PDF_PARSER_SERVICE_URL = "localhost:9009"

LOCAL_RERANK_SERVICE_URL = "localhost:8001"
LOCAL_RERANK_MODEL_NAME = 'rerank'
LOCAL_RERANK_MAX_LENGTH = 512
LOCAL_RERANK_BATCH = 1
LOCAL_RERANK_THREADS = 1
LOCAL_RERANK_PATH = os.path.join(root_path, 'qanything_kernel/dependent_server/rerank_server', 'rerank_model_configs_v0.0.1')
LOCAL_RERANK_MODEL_PATH = os.path.join(LOCAL_RERANK_PATH, "rerank.onnx")

LOCAL_EMBED_SERVICE_URL = "localhost:9005"
LOCAL_EMBED_MODEL_NAME = 'embed'
LOCAL_EMBED_MAX_LENGTH = 512
LOCAL_EMBED_BATCH = 1
LOCAL_EMBED_THREADS = 1
LOCAL_EMBED_PATH = os.path.join(root_path, 'qanything_kernel/dependent_server/embedding_server', 'embedding_model_configs_v0.0.1')
LOCAL_EMBED_MODEL_PATH = os.path.join(LOCAL_EMBED_PATH, "embed.onnx")

TOKENIZER_PATH = os.path.join(root_path, 'qanything_kernel/connector/llm/tokenizer_files')

DEFAULT_CHILD_CHUNK_SIZE = 400
DEFAULT_PARENT_CHUNK_SIZE = 800
MAX_CHARS = 1000000  # 单个文件最大字符数，超过此字符数将上传失败，改大可能会导致解析超时

# llm_config = {
#     # 回答的最大token数，一般来说对于国内模型一个中文不到1个token，国外模型一个中文1.5-2个token
#     "max_token": 512,
#     # 附带的上下文数目
#     "history_len": 2,
#     # 总共的token数，如果遇到电脑显存不够的情况可以将此数字改小，如果低于3000仍然无法使用，就更换模型
#     "token_window": 4096,
#     # 如果报错显示top_p值必须在0到1，可以在这里修改
#     "top_p": 1.0
# }

# Bot
BOT_DESC = "一个简单的问答机器人"
BOT_IMAGE = ""
BOT_PROMPT = """
- 你是一个耐心、友好、专业的机器人，能够回答用户的各种问题。
- 根据知识库内的检索结果，以清晰简洁的表达方式回答问题。
- 不要编造答案，如果答案不在经核实的资料中或无法从经核实的资料中得出，请回答“我无法回答您的问题。”（或者您可以修改为：如果给定的检索结果无法回答问题，可以利用你的知识尽可能回答用户的问题。)
"""
BOT_WELCOME = "您好，我是您的专属机器人，请问有什么可以帮您呢？"
