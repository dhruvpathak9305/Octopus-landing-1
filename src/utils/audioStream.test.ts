/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { float32ToPcm16Base64, pcm16Base64ToFloat32 } from './audioStream.js';

test('float32ToPcm16Base64 and pcm16Base64ToFloat32 convert symmetrically with low quantization error', () => {
  // Test samples in range [-1.0, 1.0]
  const original = new Float32Array([0.0, 0.5, -0.5, 0.99, -0.99, 0.123]);
  const base64 = float32ToPcm16Base64(original);

  assert.ok(typeof base64 === 'string');
  assert.ok(base64.length > 0);

  const restored = pcm16Base64ToFloat32(base64);
  assert.equal(restored.length, original.length);

  // 16-bit PCM quantization error should be within 1/32768 (~0.0001)
  for (let i = 0; i < original.length; i++) {
    const diff = Math.abs(restored[i] - original[i]);
    assert.ok(diff < 0.001, `Index ${i} diff ${diff} should be < 0.001`);
  }
});

test('float32ToPcm16Base64 clamps values outside [-1.0, 1.0]', () => {
  const overdriven = new Float32Array([2.5, -3.0]);
  const base64 = float32ToPcm16Base64(overdriven);
  const restored = pcm16Base64ToFloat32(base64);

  assert.ok(restored[0] > 0.99 && restored[0] <= 1.0);
  assert.ok(restored[1] < -0.99 && restored[1] >= -1.0);
});
