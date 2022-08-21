// const DEFAULT_STEPS = [
//     { label: 'Step 1', name: 'Job details', href: '#', status: 'complete' },
//     { label: 'Step 2', name: 'Application form', href: '#', status: 'current' },
//     { label: 'Step 3', name: 'Preview', href: '#', status: 'upcoming' },
//   ]
import { useState } from 'react';
export default function Stepper({
  steps,
  setStep,
  currentStep,
  lastCompleted,
}) {
  return (
    <nav aria-label='Progress'>
      <ol role='list' className='space-y-4 md:flex md:space-y-0 md:space-x-8'>
        {steps?.map((step, idx) => (
          <li key={step.name} className='md:flex-1'>
            {step.id === lastCompleted ? (
              <button className='disabled cursor-default group pl-4 py-2 flex flex-col border-l-4 border-indigo-600 hover:border-indigo-800 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4'>
                <span className='text-xs text-indigo-600 font-semibold tracking-wide uppercase group-hover:text-indigo-800'>
                  {`Step ${idx + 1}`}
                </span>
                <span className='text-sm font-medium'>{step.name}</span>
              </button>
            ) : step.id === currentStep ? (
              <button
                className='pl-4 py-2 flex flex-col border-l-4 border-indigo-600 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4'
                aria-current='step'
              >
                <span className='text-xs text-indigo-600 font-semibold tracking-wide uppercase'>{`Step ${
                  idx + 1
                }`}</span>
                <span className='text-sm font-medium'>{step.name}</span>
              </button>
            ) : (
              <button className='disabled cursor-default group pl-4 py-2 flex flex-col border-l-4 border-gray-200 hover:border-gray-300 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4'>
                <span className='text-xs text-gray-500 font-semibold tracking-wide uppercase group-hover:text-gray-700'>
                  {`Step ${idx + 1}`}
                </span>
                <span className='text-sm font-medium'>{step.name}</span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
