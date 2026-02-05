'use client'

import React from "react"

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Upload, X, CheckCircle2, AlertCircle, FileText, Loader2 } from 'lucide-react'
import Link from 'next/link'

type SubmissionStep = 'details' | 'files' | 'message' | 'review' | 'success'

interface SubmittedFile {
  name: string
  size: number
  id: string
}

export default function AssignmentSubmission({ assignmentId }: { assignmentId: string }) {
  const [step, setStep] = useState<SubmissionStep>('details')
  const [files, setFiles] = useState<SubmittedFile[]>([])
  const [message, setMessage] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [confirmChecks, setConfirmChecks] = useState({
    ownWork: false,
    integrity: false,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const maxFileSize = 10 * 1024 * 1024 // 10MB
  const totalSize = files.reduce((sum, f) => sum + f.size, 0)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }

  const handleFiles = (newFiles: File[]) => {
    newFiles.forEach((file) => {
      if (file.size > maxFileSize) {
        console.error(`File ${file.name} is too large`)
        return
      }
      
      const existingFile = files.find((f) => f.name === file.name)
      if (!existingFile) {
        setFiles([
          ...files,
          {
            name: file.name,
            size: file.size,
            id: Math.random().toString(36).substr(2, 9),
          },
        ])
      }
    })
  }

  const removeFile = (id: string) => {
    setFiles(files.filter((f) => f.id !== id))
  }

  const handleSubmit = async () => {
    setLoading(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    setLoading(false)
    setStep('success')
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      {step !== 'success' && (
        <div className="flex items-center justify-between">
          {['files', 'message', 'review'].map((s, idx) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                  ['files', 'message', 'review'].indexOf(step) > idx
                    ? 'bg-lab-success-green text-white'
                    : ['files', 'message', 'review'].indexOf(step) === idx
                      ? 'bg-lab-bright-blue text-white'
                      : 'bg-lab-neutral-light text-lab-neutral-gray'
                }`}
              >
                {['files', 'message', 'review'].indexOf(step) > idx ? '✓' : idx + 1}
              </div>
              <p className="text-xs text-lab-neutral-gray ml-2 capitalize">
                {s === 'message' ? 'Add message' : s}
              </p>
              {idx < 2 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-colors ${
                    ['files', 'message', 'review'].indexOf(step) > idx
                      ? 'bg-lab-success-green'
                      : 'bg-lab-neutral-light'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Assignment Details - Initial View */}
      {step === 'details' && (
        <Card className="border border-lab-neutral-light p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-lab-primary-blue">
                    Not started
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-lab-neutral-dark mb-4">Typography Test</h2>
                <p className="text-lab-neutral-gray mb-4">
                  Apply your knowledge of typography principles to create a visually harmonious design
                  that demonstrates proper hierarchy, spacing, and font pairing.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-lab-neutral-dark mb-3">Rubric</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-lab-neutral-light">
                        <th className="text-left py-2 px-3 text-lab-neutral-dark">Criteria</th>
                        <th className="text-center py-2 px-3 text-lab-neutral-dark">Points</th>
                        <th className="text-left py-2 px-3 text-lab-neutral-dark">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Accuracy', points: 20, desc: 'Type accuracy and correctness' },
                        { name: 'Creativity', points: 20, desc: 'Creative choices and originality' },
                        { name: 'Presentation', points: 10, desc: 'Visual presentation and neatness' },
                      ].map((row) => (
                        <tr key={row.name} className="border-b border-lab-neutral-light hover:bg-lab-neutral-light transition-colors">
                          <td className="py-3 px-3 text-lab-neutral-dark font-medium">{row.name}</td>
                          <td className="text-center py-3 px-3 text-lab-neutral-dark font-bold">{row.points}</td>
                          <td className="py-3 px-3 text-lab-neutral-gray">{row.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lab-neutral-dark mb-3">Resources</h3>
                <div className="space-y-2">
                  {['Typography_Guide.pdf', 'Example_Files.zip'].map((resource) => (
                    <a
                      key={resource}
                      href="#"
                      className="flex items-center gap-3 p-3 border border-lab-neutral-light rounded-lg hover:bg-lab-neutral-light transition-colors"
                    >
                      <FileText className="h-5 w-5 text-lab-bright-blue" />
                      <span className="text-lab-neutral-dark font-medium flex-1">{resource}</span>
                      <span className="text-lab-bright-blue hover:underline">Download</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <Card className="bg-lab-neutral-light p-4 border-0">
                <h3 className="font-semibold text-lab-neutral-dark mb-4">Submission Info</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-lab-neutral-gray">Due Date</p>
                    <p className="font-semibold text-lab-neutral-dark">March 15, 2026</p>
                    <p className="text-xs text-lab-neutral-gray mt-1">11:59 PM</p>
                  </div>
                  <div className="pt-3 border-t border-lab-neutral-light">
                    <p className="text-xs text-lab-neutral-gray">Max Points</p>
                    <p className="font-semibold text-lab-neutral-dark">50 points</p>
                  </div>
                  <div className="pt-3 border-t border-lab-neutral-light">
                    <p className="text-xs text-lab-neutral-gray">File Format</p>
                    <p className="font-semibold text-lab-neutral-dark text-sm">PDF, Images</p>
                  </div>
                  <div className="pt-3 border-t border-lab-neutral-light">
                    <p className="text-xs text-lab-neutral-gray">Max File Size</p>
                    <p className="font-semibold text-lab-neutral-dark">10 MB</p>
                  </div>
                </div>

                <Button
                  onClick={() => setStep('files')}
                  className="w-full mt-6 bg-lab-bright-blue text-white hover:bg-lab-primary-blue"
                >
                  Start Submission
                </Button>
              </Card>
            </div>
          </div>
        </Card>
      )}

      {/* File Upload Step */}
      {step === 'files' && (
        <Card className="border border-lab-neutral-light p-6">
          <h2 className="text-xl font-bold text-lab-neutral-dark mb-2">Submit files</h2>
          <p className="text-lab-neutral-gray mb-6">Upload your assignment files (PDF, Images)</p>

          {/* Drag and Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all ${
              dragActive
                ? 'border-lab-bright-blue bg-blue-50'
                : 'border-lab-neutral-light hover:border-lab-bright-blue'
            }`}
          >
            <Upload className="h-12 w-12 text-lab-neutral-gray mx-auto mb-4" />
            <p className="text-lg font-semibold text-lab-neutral-dark mb-2">Drag and drop files here</p>
            <p className="text-sm text-lab-neutral-gray mb-4">or</p>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="border-lab-neutral-light text-lab-bright-blue"
            >
              Browse files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              hidden
              onChange={(e) => {
                if (e.target.files) {
                  handleFiles(Array.from(e.target.files))
                }
              }}
            />
            <p className="text-xs text-lab-neutral-gray mt-4">
              Supported: PDF, JPG, PNG, GIF • Max 10MB per file
            </p>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-lab-neutral-dark mb-3">Files to submit</h3>
              <div className="space-y-2">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center gap-3 p-3 bg-lab-neutral-light rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-lab-success-green" />
                    <div className="flex-1">
                      <p className="font-medium text-lab-neutral-dark">{file.name}</p>
                      <p className="text-xs text-lab-neutral-gray">{formatFileSize(file.size)}</p>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-1 hover:bg-white rounded transition-colors"
                    >
                      <X className="h-4 w-4 text-lab-error-red" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-lab-neutral-gray">
                  {files.length} file{files.length !== 1 ? 's' : ''} selected
                </span>
                <span className={totalSize > maxFileSize ? 'text-lab-error-red font-semibold' : 'text-lab-neutral-gray'}>
                  {formatFileSize(totalSize)} / {formatFileSize(maxFileSize)}
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            <Button variant="outline" onClick={() => setStep('details')} className="flex-1 border-lab-neutral-light">
              Back
            </Button>
            <Button
              onClick={() => setStep('message')}
              disabled={files.length === 0}
              className="flex-1 bg-lab-bright-blue text-white hover:bg-lab-primary-blue disabled:opacity-50"
            >
              Next
            </Button>
          </div>
        </Card>
      )}

      {/* Message Step */}
      {step === 'message' && (
        <Card className="border border-lab-neutral-light p-6">
          <h2 className="text-xl font-bold text-lab-neutral-dark mb-2">Add message (optional)</h2>
          <p className="text-lab-neutral-gray mb-6">Include a message to your instructor</p>

          <div>
            <label className="block text-sm font-medium text-lab-neutral-dark mb-3">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 500))}
              placeholder="Explain your approach or add any comments for your instructor..."
              className="w-full h-40 p-3 border border-lab-neutral-light rounded-lg focus:border-lab-bright-blue focus:ring-1 focus:ring-lab-bright-blue resize-none text-lab-neutral-dark placeholder:text-lab-neutral-gray"
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-lab-neutral-gray">This message will be included with your submission</p>
              <span className={`text-xs font-medium ${message.length >= 450 ? 'text-lab-warning-amber' : 'text-lab-neutral-gray'}`}>
                {message.length} / 500
              </span>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <Button variant="outline" onClick={() => setStep('files')} className="flex-1 border-lab-neutral-light">
              Back
            </Button>
            <Button
              onClick={() => setStep('review')}
              className="flex-1 bg-lab-bright-blue text-white hover:bg-lab-primary-blue"
            >
              Review & Submit
            </Button>
          </div>
        </Card>
      )}

      {/* Review Step */}
      {step === 'review' && (
        <Card className="border border-lab-neutral-light p-6">
          <h2 className="text-xl font-bold text-lab-neutral-dark mb-6">Review & submit</h2>

          <div className="space-y-6">
            {/* Files */}
            <div>
              <h3 className="font-semibold text-lab-neutral-dark mb-3">Files to submit</h3>
              <div className="space-y-2">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center gap-3 p-3 bg-lab-neutral-light rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-lab-success-green" />
                    <div className="flex-1">
                      <p className="font-medium text-lab-neutral-dark">{file.name}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep('files')}
                      className="text-lab-bright-blue hover:bg-white"
                    >
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Message */}
            {message && (
              <div>
                <h3 className="font-semibold text-lab-neutral-dark mb-3">Message</h3>
                <p className="p-3 bg-lab-neutral-light text-lab-neutral-dark rounded-lg">{message}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep('message')}
                  className="mt-2 text-lab-bright-blue"
                >
                  Edit message
                </Button>
              </div>
            )}

            {/* Confirmation */}
            <div className="border-t border-lab-neutral-light pt-6">
              <h3 className="font-semibold text-lab-neutral-dark mb-3">Confirm submission</h3>
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-3 border border-lab-neutral-light rounded-lg cursor-pointer hover:bg-lab-neutral-light transition-colors">
                  <input
                    type="checkbox"
                    checked={confirmChecks.ownWork}
                    onChange={(e) => setConfirmChecks({ ...confirmChecks, ownWork: e.target.checked })}
                    className="h-4 w-4 accent-lab-bright-blue mt-1"
                  />
                  <span className="text-lab-neutral-dark">I confirm this work is my own</span>
                </label>

                <label className="flex items-start gap-3 p-3 border border-lab-neutral-light rounded-lg cursor-pointer hover:bg-lab-neutral-light transition-colors">
                  <input
                    type="checkbox"
                    checked={confirmChecks.integrity}
                    onChange={(e) => setConfirmChecks({ ...confirmChecks, integrity: e.target.checked })}
                    className="h-4 w-4 accent-lab-bright-blue mt-1"
                  />
                  <span className="text-lab-neutral-dark">I agree to the academic integrity policy</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <Button variant="outline" onClick={() => setStep('message')} className="flex-1 border-lab-neutral-light">
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!confirmChecks.ownWork || !confirmChecks.integrity || loading}
              className="flex-1 bg-lab-bright-blue text-white hover:bg-lab-primary-blue disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                'Submit assignment'
              )}
            </Button>
          </div>
        </Card>
      )}

      {/* Success Screen */}
      {step === 'success' && (
        <Card className="border border-lab-neutral-light p-12 text-center">
          <div className="inline-block mb-6">
            <div className="h-16 w-16 rounded-full bg-lab-success-green flex items-center justify-center animate-bounce">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-lab-neutral-dark mb-2">
            Submission successful!
          </h2>
          <p className="text-lab-neutral-gray mb-6">
            Your assignment has been submitted and will be reviewed by your instructor.
          </p>

          <div className="bg-lab-neutral-light p-6 rounded-lg mb-6 text-left">
            <p className="text-sm text-lab-neutral-gray mb-2">Submission ID</p>
            <p className="font-mono font-semibold text-lab-neutral-dark mb-4">SUB-20260310-001</p>

            <p className="text-sm text-lab-neutral-gray mb-2">Submitted at</p>
            <p className="font-semibold text-lab-neutral-dark mb-4">March 10, 2026 3:45 PM</p>

            <p className="text-sm text-lab-neutral-gray mb-2">Estimated grading</p>
            <p className="font-semibold text-lab-neutral-dark">7 days</p>
          </div>

          <div className="flex gap-3">
            <Link href="/courses/1" className="flex-1">
              <Button variant="outline" className="w-full border-lab-neutral-light bg-transparent">
                Back to course
              </Button>
            </Link>
            <Button className="flex-1 bg-lab-bright-blue text-white hover:bg-lab-primary-blue">
              View rubric
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
