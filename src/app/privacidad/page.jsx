import Link from "next/link";

// TODO: have a lawyer review this draft before treating it as the published policy.

export const metadata = {
  title: "Política de privacidad",
  description:
    "Cómo se tratan los datos del formulario de contacto de Miguel Angel Giraldo Duque.",
};

export default function PrivacyPage() {
  return (
    <div id="root">
      <article className="container legal">
        <p className="legal__draft">Borrador pendiente de revisión legal.</p>
        <p>
          <Link href="/#contact">Volver al contacto</Link>
        </p>
        <h1>Política de privacidad</h1>
        <p>Última actualización: 29 de octubre de 2026.</p>
        <p>
          Esta página explica qué datos se piden en el formulario de contacto de este sitio y para
          qué se usan. Es un borrador pensado para una consulta comercial en Argentina, bajo la Ley
          25.326 de Protección de los Datos Personales y su decreto reglamentario 1558/2001. No
          reemplaza el criterio de un abogado.
        </p>

        <h2>Responsable</h2>
        <p>
          Miguel Angel Giraldo Duque, desarrollador independiente, con base en Buenos Aires,
          Argentina. El sitio es{" "}
          <a href="https://www.miguelgd.com">https://www.miguelgd.com</a>.
        </p>
        {/* TODO: publicar un correo dedicado para ejercer los derechos de acceso, rectificación y supresión. */}
        <p>
          Para pedir acceso, rectificación, actualización o supresión, escribí por el formulario de
          contacto de este sitio e indicá el derecho que querés ejercer.
        </p>

        <h2>Qué datos se piden</h2>
        <p>El formulario puede guardar estos datos, que vos completás de forma voluntaria:</p>
        <ul>
          <li>Nombre completo</li>
          <li>Compañía, si la informás</li>
          <li>Email</li>
          <li>El mensaje que escribas</li>
        </ul>
        <p>
          No se piden datos sensibles según el artículo 2 de la Ley 25.326 (por ejemplo salud,
          opiniones políticas o creencias). Si los incluís en el mensaje, no hace falta: con el
          nombre, el email y el proyecto alcanza para responder.
        </p>
        <p>
          Hay un campo oculto que las personas no completan. Sirve para filtrar envíos automáticos.
          Si viene con texto, el mensaje se descarta.
        </p>

        <h2>Para qué se usan</h2>
        <p>
          La única finalidad es responder tu consulta y, si corresponde, preparar un presupuesto de
          una landing u otro trabajo que me pidas. No vendo estos datos ni los uso para publicidad
          de terceros.
        </p>
        <p>
          La base es tu consentimiento, que das al marcar la casilla del formulario. Sin ese
          consentimiento el mensaje no se envía. Si no querés dejar estos datos, podés escribirme
          por LinkedIn, que está enlazado en la página de inicio.
        </p>

        <h2>Cuánto tiempo se conservan</h2>
        {/* TODO: confirmar con un abogado el plazo de conservación. Hoy se propone un máximo orientativo de 24 meses. */}
        <p>
          Se conservan el tiempo necesario para responder y hacer el seguimiento de esa consulta,
          con un plazo orientativo de 24 meses desde el último mensaje, salvo que pidas la
          supresión antes o que una norma exija guardarlos más tiempo.
        </p>
        <p>
          Esta versión del sitio no tiene una base de datos propia. El mensaje se prepara para
          enviarlo por email. Hasta que ese envío esté conectado a un proveedor, el servidor puede
          dejar una copia en sus registros técnicos (logs) para poder ver la consulta durante el
          desarrollo. Cuando el proveedor esté elegido, esta frase se tiene que actualizar.
        </p>

        <h2>Quién más puede verlos</h2>
        <p>
          El sitio está alojado en un proveedor de hosting (previsto: Vercel). Ese proveedor procesa
          el pedido técnico del formulario.
        </p>
        {/* TODO: completar el encargado real (Resend u otro SMTP) y el mecanismo de transferencia internacional del art. 12 de la Ley 25.326. */}
        <p>
          El email todavía no sale a un proveedor concreto. Cuando se conecte, el mensaje va a
          pasar por ese servicio (por ejemplo Resend, en Estados Unidos, o un SMTP como el de un
          correo personal). Eso puede ser una transferencia internacional. El artículo 12 de la Ley
          25.326 pide que el país o el destinatario ofrezca un nivel de protección adecuado, o que
          exista otra base válida. El proveedor y la base se van a completar en esta página antes de
          activar el envío.
        </p>

        <h2>Tus derechos</h2>
        <p>
          Podés pedir acceso a tus datos (artículo 14) y su rectificación, actualización o supresión
          (artículo 16). También podés retirar el consentimiento para usos futuros. La supresión no
          borra mensajes que ya hayan sido necesarios para responder una consulta en curso, pero
          frena usos nuevos.
        </p>
        <p>
          La autoridad de control es la Agencia de Acceso a la Información Pública (AAIP), Dirección
          Nacional de Protección de Datos Personales:{" "}
          <a href="https://www.argentina.gob.ar/aaip">argentina.gob.ar/aaip</a>.
        </p>

        <h2>Seguridad</h2>
        <p>
          Uso medidas razonables para que el formulario no quede abierto a envíos automáticos y para
          no publicar estos datos en el sitio. Ningún envío por internet es imposible de interceptar.
        </p>

        <h2>Menores</h2>
        <p>El sitio y el formulario no están dirigidos a menores de edad.</p>

        <h2>Cambios</h2>
        <p>
          Si esta política cambia, la versión nueva se publica en esta misma dirección con otra
          fecha.
        </p>
      </article>
    </div>
  );
}
