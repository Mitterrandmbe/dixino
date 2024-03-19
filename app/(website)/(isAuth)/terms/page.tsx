import Container from '@/app/components/Container';
import { singleLevelNestedRoutes } from '@/app/libs/routes';
import Link from 'next/link';


const TermsPage = () => {
  return (
    <Container>
        <div className='grid grid-cols-1 font-semibold mt-8 gap-4'>
            <div>
                <Link href={singleLevelNestedRoutes.terms.fr} className='hover:text-primary'>Conditions générales d{"'"}utilisation</Link>

            </div>

            <div>
            <Link href={singleLevelNestedRoutes.terms.nl} className='hover:text-primary'>Servicevoorwaarden</Link>

            </div>
        </div>
    </Container>
  )
}

export default TermsPage