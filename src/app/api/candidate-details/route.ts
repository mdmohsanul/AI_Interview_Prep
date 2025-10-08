

export async function POST(request:Request){
    const {job_role,yearsOfExperience,technicalKeywords,companyType,interviewRound,focusArea} = await request.json()
    console.log(job_role,yearsOfExperience,technicalKeywords,companyType,interviewRound,focusArea)
}