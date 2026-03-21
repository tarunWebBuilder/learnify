'use client'

import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Option {
  id: string
  text: string
}

interface Question {
  id: number
  text: string
  options: Option[]
}

const mockQuestions: Question[] = Array.from({ length: 100 }).map((_, i) => ({
  id: i + 1,
  text:
    i === 11
      ? 'If there is a debit balance in the ___________, it represents anticipated loss on a futures contract.'
      : i === 24
      ? 'When there is high volatility in the stock markets, the Bid-Ask spreads will generally _______.'
      : i === 57
      ? 'In the books of account of the client, the balance in the Initial Margin account on the Balance Sheet date must be shown under the head ___________.'
      : `Sample question text for Question ${i + 1}. This is placeholder text to simulate a real exam environment.`,
  options:
    i === 11
      ? [
          { id: 'A', text: 'Mark-to-market Margin account' },
          { id: 'B', text: 'Additional Margin account' },
          { id: 'C', text: 'Initial Margin account' },
          { id: 'D', text: 'Exposure Margin account' },
        ]
      : i === 24
      ? [
          { id: 'A', text: 'Widen' },
          { id: 'B', text: 'Narrow' },
          { id: 'C', text: 'Will become zero' },
          { id: 'D', text: 'There will no change in the bid-ask spreads' },
        ]
      : i === 57
      ? [
          { id: 'A', text: 'Reserves and surplus' },
          { id: 'B', text: 'Investments' },
          { id: 'C', text: 'Current Liabilities' },
          { id: 'D', text: 'Current Assets' },
        ]
      : [
          { id: 'A', text: 'Option A value' },
          { id: 'B', text: 'Option B value' },
          { id: 'C', text: 'Option C value' },
          { id: 'D', text: 'Option D value' },
        ],
}))

export function QuizInterface() {
  const [currentIdx, setCurrentIdx] = useState(24) // Defaulting to Q25 per the screenshot
  const [answers, setAnswers] = useState<Record<number, string>>({
    // Prefill some answers to match screenshot 4's navigator
    ...Array.from({ length: 24 }).reduce((acc: any, _, idx) => {
      acc[idx] = 'A' // Mocking answered state
      return acc
    }, {}),
    57: 'C', // Screenshot 3 has C selected for Q58
  })

  const question = mockQuestions[currentIdx]
  const totalQuestions = mockQuestions.length
  const progressPercent = Math.round(((currentIdx + 1) / totalQuestions) * 100)

  const handleSelectOption = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIdx]: optionId,
    }))
  }

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1)
    }
  }

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex justify-center items-start">
      <div className="w-full max-w-4xl pt-4">
        <Card className="shadow-lg border-0">
          <CardContent className="p-6 md:p-10">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                  NISM Series VIII - Mock Test 1
                </h1>
                <p className="text-slate-500 text-sm mt-1">Mock Test</p>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg border border-blue-100 shadow-sm">
                <Clock className="w-4 h-4" />
                <span className="font-semibold text-sm">107:35</span>
              </div>
            </div>

            {/* Progress Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-slate-700">
                  Question {currentIdx + 1} of {totalQuestions}
                </span>
                <span className="text-xs font-semibold bg-[#2563EB] text-white px-3 py-0.5 rounded-full">
                  {progressPercent}% completed
                </span>
              </div>
              <Progress
                value={progressPercent}
                className="h-2.5 bg-slate-100 [&>div]:bg-[#2563EB]"
              />
            </div>

            {/* Question Text */}
            <div className="mb-8">
              <h2 className="text-lg md:text-xl font-semibold text-slate-800 leading-relaxed tracking-tight">
                {question.text}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-4 mb-10">
              {question.options.map((option) => {
                const isSelected = answers[currentIdx] === option.id
                return (
                  <div
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={cn(
                      'flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200',
                      isSelected
                        ? 'border-[#2563EB] bg-[#EFF6FF] shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    )}
                  >
                    <div
                      className={cn(
                        'w-8 h-8 flex items-center justify-center rounded-full border mr-4 text-sm font-bold flex-shrink-0 transition-colors',
                        isSelected
                          ? 'border-[#2563EB] bg-[#2563EB] text-white'
                          : 'border-slate-300 text-slate-500'
                      )}
                    >
                      {option.id}
                    </div>
                    <span
                      className={cn(
                        'text-base',
                        isSelected ? 'text-[#1E3A8A] font-medium' : 'text-slate-700'
                      )}
                    >
                      {option.text}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentIdx === 0}
                className="text-blue-600 border-blue-200 hover:bg-blue-50 px-6 h-11"
              >
                <ArrowLeft className="mr-2 w-4 h-4" /> Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentIdx === totalQuestions - 1}
                className="bg-[#0070F3] hover:bg-blue-700 text-white px-8 h-11"
              >
                Next <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            {/* Question Navigator */}
            <div className="mt-12 pt-6 border-t border-slate-100">
              <h3 className="text-slate-600 font-medium mb-4">Question Navigator:</h3>
              <div className="flex flex-wrap gap-2.5">
                {mockQuestions.map((q, idx) => {
                  const isCurrent = currentIdx === idx
                  const isAnswered = !!answers[idx]

                  let statusClass = 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  
                  if (isCurrent) {
                    statusClass = 'bg-[#2563EB] text-white ring-2 ring-blue-200 ring-offset-1'
                  } else if (isAnswered) {
                    statusClass = 'bg-[#DCFCE7] text-[#166534] font-medium'
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIdx(idx)}
                      className={cn(
                        'w-9 h-9 flex justify-center items-center rounded-full text-sm transition-colors',
                        statusClass
                      )}
                    >
                      {q.id}
                    </button>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
