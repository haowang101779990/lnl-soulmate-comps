from typing import Literal
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from langgraph.graph import StateGraph, END
from nodes import aboutme_node, router_node, rag_node, web_node, answer_node
from shared import AgentState

# ── Routing helpers ─────────────────────────────────────────────────
def from_router(st: AgentState) -> Literal["rag", "answer", "end","aboutme","web_search"]:
    return st["route"]

def after_rag(st: AgentState) -> Literal["answer", "web"]:
    return st["route"]

def after_web(_) -> Literal["answer"]:
    return "answer"

# ── Build graph ─────────────────────────────────────────────────────
g = StateGraph(AgentState)
g.add_node("router", router_node)
g.add_node("rag_lookup", rag_node)
g.add_node("web_search", web_node)
g.add_node("answer", answer_node)
g.add_node("aboutme",aboutme_node)

g.set_entry_point("router")
g.add_conditional_edges("router", from_router,
                        {"rag": "rag_lookup", "answer": "answer", "web_search":"web_search","end": END,"aboutme":"aboutme"})
g.add_conditional_edges("rag_lookup", after_rag,
                        {"answer": "answer", "web": "web_search"})
g.add_edge("aboutme",END)
g.add_edge("web_search",  "answer")
g.add_edge("answer", END)



agent = g.compile()

