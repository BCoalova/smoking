import react from '@vitejs/plugin-react'

export default {
    plugins: [react()],
    build: {
        chunkSizeWarningLimit: 3000,
        outDir: './build',
    },
    extends: ['eslint:recommended'],
}
