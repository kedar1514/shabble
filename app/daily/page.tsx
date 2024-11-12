import React from 'react'
import Daily from '@/components/daily/daily'
import { GameSettingsProvider } from '@/contexts'

function DailyPage() {
  return (
    <GameSettingsProvider>
      <Daily />
    </GameSettingsProvider>
  )
}

export default DailyPage