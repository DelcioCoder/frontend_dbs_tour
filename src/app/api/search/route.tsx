// app/api/search/route.ts
import  fetchData from '@/utils/fetchData';
import { NextResponse } from 'next/server';
import { Evaluation } from '@/types/api';
import { PaginatedResponse } from '@/types/api';
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  
  try {
    const [data, evaluations] = await Promise.all([
      fetchData(`search/?q=${query}`),
      fetchData<PaginatedResponse<Evaluation>>("evaluations/")
    ])
    return NextResponse.json({
      "evaluations": evaluations,
      data
    })
  } catch (error) {
    return NextResponse.json({ error: 'Falha na busca' }, { status: 500 });
  }
}