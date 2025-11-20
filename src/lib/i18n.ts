export type Language = 'es' | 'en';

export const translations = {
  es: {
    title: "¡SOY RICO!",
    subtitle: "La app más lujosa del mundo",
    mainButton: "¡Presiona aquí!",
    description: "Demuestra tu estatus con la aplicación más exclusiva",
    features: {
      title: "Características Premium",
      luxury: "Diseño Ultra Lujoso",
      luxuryDesc: "Experimenta el lujo en cada pixel",
      exclusive: "Totalmente Exclusivo",
      exclusiveDesc: "Solo para los más selectos",
      premium: "Experiencia Premium",
      premiumDesc: "Animaciones y efectos de primera clase",
    },
    legal: {
      privacy: "Política de Privacidad",
      terms: "Términos y Condiciones",
      privacyContent: `
# Política de Privacidad

Esta aplicación no recopila, almacena ni procesa ningún dato personal.

## Información que no recopilamos:
- Datos personales
- Información de ubicación
- Datos de uso
- Información del dispositivo

## Uso de la aplicación:
Esta aplicación es puramente decorativa y de entretenimiento. No requiere permisos especiales y funciona completamente offline.

Última actualización: ${new Date().toLocaleDateString('es-ES')}
      `,
      termsContent: `
# Términos y Condiciones

Al usar esta aplicación, aceptas los siguientes términos:

## Uso de la aplicación:
1. Esta aplicación es solo para entretenimiento
2. No se otorga ningún valor real o servicio
3. No hay compras ni transacciones dentro de la app

## Limitación de responsabilidad:
Esta aplicación se proporciona "tal cual" sin garantías de ningún tipo.

## Propiedad intelectual:
Todos los derechos reservados © ${new Date().getFullYear()}

Última actualización: ${new Date().toLocaleDateString('es-ES')}
      `,
    }
  },
  en: {
    title: "I AM RICH!",
    subtitle: "The world's most luxurious app",
    mainButton: "Press here!",
    description: "Show your status with the most exclusive application",
    features: {
      title: "Premium Features",
      luxury: "Ultra Luxurious Design",
      luxuryDesc: "Experience luxury in every pixel",
      exclusive: "Totally Exclusive",
      exclusiveDesc: "Only for the most select",
      premium: "Premium Experience",
      premiumDesc: "First-class animations and effects",
    },
    legal: {
      privacy: "Privacy Policy",
      terms: "Terms and Conditions",
      privacyContent: `
# Privacy Policy

This application does not collect, store, or process any personal data.

## Information we don't collect:
- Personal data
- Location information
- Usage data
- Device information

## Application use:
This application is purely decorative and for entertainment purposes. It requires no special permissions and works completely offline.

Last updated: ${new Date().toLocaleDateString('en-US')}
      `,
      termsContent: `
# Terms and Conditions

By using this application, you agree to the following terms:

## Application use:
1. This application is for entertainment only
2. No real value or service is granted
3. There are no purchases or transactions within the app

## Limitation of liability:
This application is provided "as is" without warranties of any kind.

## Intellectual property:
All rights reserved © ${new Date().getFullYear()}

Last updated: ${new Date().toLocaleDateString('en-US')}
      `,
    }
  }
};

export const getTranslation = (lang: Language) => translations[lang];
