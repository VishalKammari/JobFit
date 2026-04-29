import React from 'react'
import Navbar from '~/components/Navbar'
import {useState} from 'react'
import FileUploader from '~/components/FIleUploader'

const upload = () => {
    const [isProcessing,setIsProcessing]=useState(false)
    const [statusText,setStatusText]=useState('')
    const [file,setFile]=useState<File|null>(null)

    const handleFileSelect=(file:File|null)=>{
        setFile(file)
    }

    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const form = e.currentTarget.closest('form')
        if(!form) return
        const formData = new FormData(form)
        const companyName = formData.get('company-name')
        const jobTitle = formData.get('job-title')
        const jobDescription = formData.get('job-description')

        console.log({
            companyName,
            jobTitle,
            jobDescription,
            file
        })
    }


  return (
    <main className="bg-[url('../images/bg-main.svg')] bg-cover"> 
    <Navbar />
    <section className="main-section">
        <div className="page-heading py-16">
            <h1>Smart feedback for your resume</h1>
            {isProcessing ? (
                <>
                    <h2>{statusText}</h2>
                    <img src='/images/resume-scan.gif' className="w-full"></img>
                </>
            ):(
                <h2>Drop your resume for ATS and improvement tips</h2>
            )}
            {!isProcessing && (
                <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                    <div className="form-div">
                        <label htmlFor="company-name" className="ml-4 form-label">Company Name</label>
                        <input type="text" id="company-name" name="company-name" placeholder="Enter company name" className="form-input" required /> 
                    </div>
                    <div className="form-div">
                        <label htmlFor="job-title" className="ml-4 form-label">Job Title</label>
                        <input type="text" id="job-title" name="job-title" placeholder="Enter job title" className="form-input" required /> 
                    </div>
                    <div className="form-div">
                        <label htmlFor="job-description" className="ml-4 form-label">Job Description</label>
                        <textarea rows={5} id="job-description" name="job-description" placeholder="Enter job description" className="form-input" required></textarea>
                    </div>
                    <div className="form-div">
                        <label htmlFor="uploader" className="ml-4 form-label">Upload Resume</label>
                        <FileUploader onFileSelect={handleFileSelect} />
                    </div>
                    <button type="submit" className="primary-button">
                        Analyze Resume
                    </button>
                </form>
            )}
        </div>
    </section>
    </main>
  )
}

export default upload