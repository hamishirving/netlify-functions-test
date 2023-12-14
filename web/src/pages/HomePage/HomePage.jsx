import { useState } from 'react'

import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  const [message, setMessage] = useState({ show: 'NONE', text: '', status: '' })

  const handleTestBtnClick = async () => {
    setMessage({ show: 'NONE', text: '', status: '' })
    await fetch('/.netlify/functions/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify('Testing'),
    })
      .then((response) => {
        if (!response.ok) {
          setMessage({
            show: 'ONE',
            text: `${response.status}:${response.statusText}`,
            status: 'ERROR',
          })
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        console.log('data', data)
        setMessage({ show: 'ONE', text: data.data, status: 'SUCCESS' })
      })
  }

  const handleTestBtnV2Click = async () => {
    setMessage({ show: 'NONE', text: '', status: '' })
    await fetch('/.netlify/functions/testTwo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify('Testing Two'),
    })
      .then((response) => {
        console.log('response', response)
        if (!response.ok) {
          setMessage({ show: 'TWO', text: response.status, status: 'ERROR' })
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        setMessage({ show: 'TWO', text: data.data, status: 'SUCCESS' })
      })
  }

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div className="max-w-xl mx-auto w-full justify-center items-center mt-20">
        <div className="flex flex-col items-start space-y-4">
          <div className="p-4 space-y-2 border border-gray-200 rounded-md w-full">
            <h3 className="font-bold">Old Format</h3>
            <p>
              This is using the AWS Lambda supported format{' '}
              <a
                href="https://docs.netlify.com/functions/lambda-compatibility"
                className="underline underline-offset-4 text-blue-600"
                target="_blank"
                rel="noreferrer"
              >
                Documented here
              </a>
            </p>
            <button
              className=" bg-blue-200 border border-blue-400 p-2 rounded-md"
              onClick={() => handleTestBtnClick()}
            >
              Test Old Format
            </button>
            {message.show === 'ONE' && (
              <div
                className={`${
                  message.status === 'SUCCESS' ? 'bg-green-100' : 'bg-red-100'
                } bg-green-100 rounded-md p-4 w-full`}
              >
                {message.text}
              </div>
            )}
          </div>
          <div className="p-4 space-y-2 border border-gray-200 rounded-md w-full">
            <h3 className="font-bold">New Format</h3>
            <p>
              This is using the new format{' '}
              <a
                href="https://docs.netlify.com/functions/get-started"
                className="underline underline-offset-4 text-blue-600"
                target="_blank"
                rel="noreferrer"
              >
                Documented here
              </a>
            </p>
            <button
              className=" bg-blue-200 border border-blue-400 p-2 rounded-md"
              onClick={() => handleTestBtnV2Click()}
            >
              Test New Format
            </button>
            {message.show === 'TWO' && (
              <div
                className={`${
                  message.status === 'SUCCESS' ? 'bg-green-100' : 'bg-red-100'
                } bg-green-100 rounded-md p-4 w-full`}
              >
                {message.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
