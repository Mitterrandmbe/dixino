import '../globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

const font = Montserrat({ subsets: ['latin'] });

export const metadata : Metadata = {
  title: 'Rejoindre Dixino',
  description: 'Trouvez un professionnel pour des travaux ou pour faire le ménage chez vous.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
      </body>
    </html>
  )
}