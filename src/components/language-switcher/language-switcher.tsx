import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { JSX } from 'react';

export function LanguageSwitcher(): JSX.Element {
  const path = usePathname();
  const locale = path.split('/');
  const router = useRouter();

  const handleLanguageChange = (newLocale: string): void => {
    const newLocaleArray = [...locale]; // создаем копию
    newLocaleArray[1] = newLocale;
    const newPath = newLocaleArray.join('/');
    router.push(newPath);
  };

  return (
    <div className="lang-switcher-container">
      <Image
        src="/icons/en.png"
        alt="England flag"
        width={24}
        height={24}
        className="en-flag"
        onClick={() => handleLanguageChange('en')}
      />
      <Image
        src="/icons/ru.png"
        alt="Russia flag"
        width={24}
        height={24}
        className="ru-flag"
        onClick={() => handleLanguageChange('ru')}
      />
    </div>
  );
}
