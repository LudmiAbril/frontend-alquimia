import DesignBottle from '@/components/DesignBottle/DesignBottle'
import { DesignBottleProvider } from '@/context/DesignBottleContext'
import React from 'react'

export default function DiseniarBotella() {
  return (
    <DesignBottleProvider>
      <DesignBottle />
    </DesignBottleProvider>
  )
}
