# Historias de Usuario para la App del Mariposario

## Descripción General
Esta aplicación móvil es un proyecto universitario para el Jardín Botánico de la universidad. Su objetivo es servir como una "Pokédex" de mariposas, permitiendo a los usuarios explorar la colección de mariposas del mariposario, ver información detallada de cada especie, y gestionar la experiencia del usuario con autenticación y temas visuales. Toda la base de datos y almacenamiento de la app se gestionará con Firebase.

---

## Historias de Usuario

### 1. Como visitante del mariposario
**Quiero** ver una lista de todas las mariposas disponibles en el mariposario
**Para** poder conocer las especies presentes y explorar sus características.

#### Criterios de aceptación:
- La pantalla principal muestra una lista de tarjetas, una por cada mariposa.
- Cada tarjeta muestra el nombre, una imagen y un resumen breve de la mariposa.

---

### 2. Como usuario interesado en una mariposa específica
**Quiero** poder tocar una tarjeta de mariposa y ver información detallada
**Para** conocer más sobre sus etapas de vida, imágenes, hábitat y otros datos relevantes.

#### Criterios de aceptación:
- Al seleccionar una tarjeta, se abre una pantalla con información detallada de la mariposa.
- Se muestran imágenes de las diferentes etapas (huevo, larva, crisálida, adulto).
- Se incluye información adicional como distribución, alimentación, etc.

---

### 3. Como usuario de la app
**Quiero** poder buscar mariposas por nombre o características
**Para** encontrar rápidamente la especie que me interesa.

#### Criterios de aceptación:
- Hay una barra de búsqueda en la pantalla principal.
- Al escribir, la lista de mariposas se filtra en tiempo real.

---

### 4. Como usuario registrado
**Quiero** poder iniciar sesión y ver mi información en la app
**Para** personalizar mi experiencia y acceder a funciones adicionales.

#### Criterios de aceptación:
- Hay autenticación de usuario (por ejemplo, con correo y contraseña, o Google/Facebook).
- En la barra lateral se muestra el nombre y correo del usuario.

---

### 5. Como usuario
**Quiero** poder cambiar entre modo claro y modo oscuro
**Para** adaptar la apariencia de la app a mis preferencias visuales.

#### Criterios de aceptación:
- Hay un interruptor en la barra lateral para cambiar el tema.
- Todos los componentes de la app respetan el tema seleccionado.

---

### 6. Como usuario
**Quiero** poder cerrar sesión desde la barra lateral
**Para** proteger mi información cuando termine de usar la app.

#### Criterios de aceptación:
- Hay un botón de "Cerrar sesión" en la barra lateral.
- Al cerrar sesión, se regresa a la pantalla de login.

---

### 7. Como administrador (futuro)
**Quiero** poder agregar, editar o eliminar mariposas desde un panel de administración
**Para** mantener actualizada la base de datos del mariposario.

#### Criterios de aceptación:
- (A implementar) Panel de administración protegido para CRUD de mariposas.

---

## Consideraciones Técnicas
- Toda la información de mariposas, usuarios e imágenes se almacenará y gestionará con Firebase (Firestore y Storage).
- La app debe ser responsiva y funcionar en dispositivos Android e iOS.
- El código debe estar bien documentado y estructurado para facilitar futuras mejoras.

---

## Resumen
Esta app busca ser una herramienta educativa y de consulta para los visitantes y entusiastas del mariposario, combinando una experiencia visual atractiva con información científica y de fácil acceso.