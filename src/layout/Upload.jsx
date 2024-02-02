import { useState } from 'react'
import { upload } from '../utils/backend.utils'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Upload() {
    const [file, setFile] = useState(null)
    const [isFileOvering, setIsFileOvering] = useState(false)
    const [isUploading, setIsUploading] = useState(false)

    const handleDragOver = (e)=>{
        e.preventDefault()
        setIsFileOvering(true)
    }

    const handleDragleave = (e)=>{
        e.preventDefault()
        setIsFileOvering(false)
    }

    const handleDrop = (e)=>{
        e.preventDefault()
        const dropedFile = e.dataTransfer.files[0]
        const allowdFileTypes = ['text/csv', 'application/json']
        if(allowdFileTypes.includes(dropedFile.type)){
            setFile(dropedFile)
        }
        setIsFileOvering(false)
    }

    const handleFileInputChange = (e)=>{
        e.preventDefault()
        const dropedFile = e.target.files[0]
        const allowdFileTypes = ['text/csv', 'application/json']
        if(allowdFileTypes.includes(dropedFile.type)){
            setFile(dropedFile)
        }
    }

    const submitHandler = async(e)=>{
        e.preventDefault()
        if(isUploading || !file) return
        setIsUploading(true)
        const toastID = toast.loading('Uploading...', {
        position: 'top-center'
        })
        try {
            console.log(file)
            const formData = new FormData()
            formData.append('ff', file)
            const response = await upload(formData)
            setFile(null)
            console.log(response)
            toast.update(toastID, {
                render: 'Successfully, uploaded the file.',
                type: 'success',
                position: 'top-center',
                autoClose: 5000,
                isLoading: false
            })
        } catch (error) {
            // alert(error.response.statusText)
            toast.update(toastID, {
                render: error.response.statusText,
                type: 'error',
                position: 'top-center',
                autoClose: 5000,
                isLoading: false
            })
        }
        setIsUploading(false)
    }

    
  return (
    <div className="flex items-center justify-center">

    <div className="mx-auto w-full max-w-[550px] ">
    
        <form className="py-4 px-9" onSubmit={(e)=>submitHandler(e)}>
            <div className="mb-6 pt-4">
                <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                    Upload File
                </label>

                {file ? <div className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
                    <div className="flex items-center justify-between" 
                        >
                        <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                            {file.name} 
                        </span>
                        <button className="text-[#07074D]" onClick={()=>setFile(null)}>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                    d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                                    fill="currentColor" />
                                <path fillRule="evenodd" clipRule="evenodd"
                                    d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                                    fill="currentColor" />
                            </svg>
                        </button>
                    </div>
                </div>
                        :
                <div className="mb-8"  onDrop={(e)=>handleDrop(e)} onDragOver={(e)=>handleDragOver(e)} onDragLeave={(e)=>handleDragleave(e)}>
                <input type="file" name="file" id="file" className="sr-only" onChange={(e)=>handleFileInputChange(e)}/>
                <label htmlFor="file"
                    className={`relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed hover:border-blue-500  border-[#e0e0e0] p-12 text-center ${ (isFileOvering && "border-blue-700  bg-blue-100")}`}>
                    <div>
                        <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                            Drop excel file here
                        </span>
                        <span className="mb-2 block text-base font-medium text-[#6B7280]">
                            Or
                        </span>
                        <span
                            className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                            Browse
                        </span>
                    </div>
                </label>
            </div>}

            </div>

            <div>
                <button type='submit'
                    className="hover:shadow-form w-full rounded-md bg-teal-600 hover:bg-teal-700 active:bg-teal-800 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                    Send File
                </button>
            </div>
        </form>
    </div>
    <ToastContainer></ToastContainer>
</div>
  )
}

export default Upload
