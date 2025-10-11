import { Suspense } from 'react';
import FinalContent from './FinalContent';

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <FinalContent />
    </Suspense>
  );
}
