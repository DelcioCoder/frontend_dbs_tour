import  fetchData from '@/utils/fetchData';
import { NextResponse } from 'next/server';
import { Evaluation } from '@/types/api';
import { PaginatedResponse } from '@/types/api';
import { ImageType } from "@/types";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  
  try {
    const [data, imageData, evaluations] = await Promise.all([
      fetchData(`search/?q=${query}`),
      fetchData<PaginatedResponse<ImageType>>(`images/`),
      fetchData<PaginatedResponse<Evaluation>>("evaluations/")
    ])
    return NextResponse.json({
      "evaluations": evaluations,
      "images": imageData,
      data
    })
  } catch (error) {
    return NextResponse.json({ error: 'Falha na busca' }, { status: 500 });
  }
}