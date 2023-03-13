// libs/__mocks__/prisma.ts
import { PrismaClient } from '@prisma/client'
import { beforeEach } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'

// 2 reset client before each test
beforeEach(() => {
  mockReset(prisma)
})

// 3 mock client deeply
const prisma = mockDeep<PrismaClient>()
export default prisma