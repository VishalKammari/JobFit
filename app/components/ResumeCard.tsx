import React from 'react'
import { Link } from 'react-router'
import type { Resume } from '../../types'
import ScoreCircle from './ScroolCircle'

const ResumeCard = ({ resume }: { resume: Resume }) => {
  return (
    <Link to={`/resume/${resume.id}`} className='resume-card h-[500px] animate-in fade-in duration-1000 '>
        <div className="resume-card-header">
            <div className="flex flex-col gap-2">
                <h2 className="text-black font-bold wrap-break-words">{resume.companyName}</h2>
                <h3 className="text-gray-600 wrap-break-word text-lg">{resume.jobTitle}</h3>
            </div>
            <div className="shrink-0">
                <ScoreCircle score={resume.feedback.overallScore} />
            </div>
        </div>
        <div className="gradiant-border animate-in fade-in duration-1000">
            <div className="w-full h-full">
                <img src={resume.imagePath} alt="resume" className="w-full h-[350px] max-sm:hover:[200px] object-cover object-top" />
            </div>
        </div>
    </Link>
  )
}

export default ResumeCard