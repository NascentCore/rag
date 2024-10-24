import { request } from '@umijs/max';
import useSWR from 'swr';
export async function api_get_file_base64(data: { file_id: string; user_id: string }) {
  return request('http://knowledge.llm.sxwl.ai:30002/api/local_doc_qa/get_file_base64', {
    method: 'POST',
    data,
  });
}

// 查询知识库列表
export async function api_list_knowledge_base() {
  return request('http://knowledge.llm.sxwl.ai:30002/api/local_doc_qa/list_knowledge_base', {
    method: 'POST',
    data: {
      user_id: 'zzp',
    },
  });
}

// 查询知识库文档 http://knowledge.llm.sxwl.ai:30002/api/local_doc_qa/list_files
export async function api_list_files(params: {
  kb_id: string;
  page_id: number;
  page_limit: number;
  user_id: string;
}) {
  return request('http://knowledge.llm.sxwl.ai:30002/api/local_doc_qa/list_files', {
    method: 'POST',
    data: params,
  });
}
