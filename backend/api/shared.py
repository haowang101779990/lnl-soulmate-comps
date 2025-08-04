from typing import TypedDict, List, Literal
from pydantic import BaseModel, Field
from langchain_openai import ChatOpenAI
from langchain.chat_models import init_chat_model
from langchain_core.messages import BaseMessage

# ── Pydantic schemas ─────────────────────────────────────────────────
class RouteDecision(BaseModel):
    route: Literal["rag", "answer", "end"]
    reply: str  = Field('', description="Filled only when route == 'end'")
    targetTime:str=Field('', description="the time user queried of")



class RagJudge(BaseModel):
    sufficient: bool

# ── LLM instances with structured output where needed ───────────────
router_llm = init_chat_model(model="qwen-plus",
                        model_provider="openai",
                        base_url="https://dashscope.aliyuncs.com/compatible-mode/v1")\
             .with_structured_output(RouteDecision.model_json_schema())
judge_llm  = init_chat_model(model="qwen-plus",
                        model_provider="openai",
                        base_url="https://dashscope.aliyuncs.com/compatible-mode/v1")\
             .with_structured_output(RagJudge.model_json_schema())
answer_llm = init_chat_model(model="qwen-plus",
                        model_provider="openai",
                        base_url="https://dashscope.aliyuncs.com/compatible-mode/v1")

# ── Shared state type ────────────────────────────────────────────────
class AgentState(TypedDict, total=False):
    messages: List[BaseMessage]
    route:    Literal["rag", "answer", "end"]
    rag:      str
    web:      str 
    targetTime: str