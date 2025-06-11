from dotenv import load_dotenv
from pydantic import BaseModel
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from langchain.agents import create_tool_calling_agent, AgentExecutor
from tools import search_tool, wiki_tool, save_tool


# -------------------------------------------------#
# Before starting ensure you are in venv

# for mac to create venv use:
# python3 -m venv venv

# for windows to create venv use:
# python -m venv venv



# to activate venv on mac use:
# source venv/bin/activate

# to activate venv on windows use:
# venv\Scripts\activate

#then do pip install -r requirements.txt

# -------------------------------------------------#


# create a .env file in the root directory with your OpenAI API key
# have OPENAI_API_KEY= "your_openai_api_key_here"
load_dotenv()

class ResearchResponse(BaseModel):
    topic: str
    summary: str
    sources: list[str]
    tools_used: list[str]
    

llm = ChatOpenAI(model = "gpt-4o")
parser = PydanticOutputParser(pydantic_object=ResearchResponse)

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
            You are a research assistant that will help generate a research paper.
            Answer the user query and use necessary tools making the research paper at least 500 words. 
            After answering, always use the save_text_file tool to save your research. Ensure that it is fully formated with proper spacing and indentation to make it easy to read.
            Add bullet points, headings, and subheadings where necessary. 
            Wrap the output in this format and provide no other text:
            {format_instructions}
            """,
        ),
        ("placeholder", "{chat_history}"),
        ("human", "{query}"),
        ("placeholder", "{agent_scratchpad}"),
    ]
).partial(format_instructions=parser.get_format_instructions())

# Tools that will be defined and used by the agent
tools = [search_tool, wiki_tool, save_tool]

agent = create_tool_calling_agent(
    llm=llm,
    prompt=prompt,
    tools=tools
)

agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
query = input("\n\nWhat can i help you research? ")
raw_response = agent_executor.invoke({"query": query})

try:
    structured_response = parser.parse(raw_response["output"])
    print(structured_response)
except Exception as e:
    print("Error parsing response", e, "Raw Response - ", raw_response)