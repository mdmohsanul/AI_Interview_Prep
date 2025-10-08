

export async function POST(request:Request){
    const {job_role,yearsOfExperience,technicalKeywords,companyType,interviewRound,focusArea} = await request.json()
    console.log(job_role,yearsOfExperience,technicalKeywords,companyType,interviewRound,focusArea)
    return Response.json(
      {
        success: true,
        message: `${job_role} ${yearsOfExperience}`,
      },
      { status: 201 }
    );
}