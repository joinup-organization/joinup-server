import { initializeApp } from 'firebase-admin'

class AppAdapter {
  public readonly initializeApp = () => {
    initializeApp()
  }
}

export const appAdapter = new AppAdapter()
