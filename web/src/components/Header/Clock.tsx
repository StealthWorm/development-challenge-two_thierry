import { useState, useEffect } from 'react'

type Props = {}

export default function Clock({ }: Props) {
  const date = new Date();
  const [clockState, setClockState] = useState('');

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClockState(`${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${("0" + date.getSeconds()).slice(-2)}`);
    }, 1000);
  }, [])

  return (
    <div data-testid="clock" className="flex-col text-zinc-50 font-semibold justify-end items-center w-auto">
      <h3 className="flex justify-end text-2xl">{`${("0" + date.getDate()).slice(-2)}/${("0" + date.getMonth() + 1).slice(-2)
        }/${date.getFullYear()}`}</h3>
      <div className="flex justify-end text-md text-zinc-400">{clockState}</div>
    </div>
  )
}