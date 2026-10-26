// Conexión con Google Drive (inicio de sesión + lectura del archivo de configuración)
const GOOGLE = {
  clientId: '1058463934397-nhnvj9lfd6rd6svfq1nf7pkldgp32m8n.apps.googleusercontent.com',
  apiKey: 'AIzaSyByFb8CIIC0Xtnbxt_dommNR8xDVYH0XhM',   // restringida a txgdl.github.io y a Drive/Picker
  proyecto: '1058463934397',
  scope: 'https://www.googleapis.com/auth/drive.file',
  archivoConfig: 'config-privada.json'
};
const Drive = (() => {
  let token = null, vence = 0, cliente = null;
  const listo = () => !!(window.google && google.accounts && google.accounts.oauth2 && window.gapi);

  function obtenerToken(forzar) {
    return new Promise((res, rej) => {
      if (!listo()) return rej(new Error('No se pudo cargar Google. Revisa tu conexión a internet e intenta de nuevo.'));
      if (token && Date.now() < vence && !forzar) return res(token);
      cliente = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE.clientId, scope: GOOGLE.scope,
        callback: r => {
          if (r.error) return rej(new Error('Google no autorizó el acceso (' + r.error + ').'));
          token = r.access_token; vence = Date.now() + (Number(r.expires_in || 3600) - 120) * 1000; res(token);
        },
        error_callback: e => rej(new Error(e && e.type === 'popup_closed' ? 'Se cerró la ventana de Google antes de terminar.' : 'No se pudo iniciar sesión con Google.'))
      });
      cliente.requestAccessToken({ prompt: token ? '' : 'select_account' });
    });
  }
  const api = async (url, tk) => {
    const r = await fetch(url, { headers: { Authorization: 'Bearer ' + tk } });
    if (!r.ok) { const e = new Error('Drive respondió ' + r.status); e.status = r.status; throw e; }
    return r;
  };
  async function leerPorId(id, tk) { return (await api(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(id)}?alt=media`, tk)).json(); }
  async function buscar(tk) {
    const q = encodeURIComponent(`name='${GOOGLE.archivoConfig}' and trashed=false`);
    const j = await (await api(`https://www.googleapis.com/drive/v3/files?q=${q}&orderBy=modifiedTime%20desc&fields=files(id,name)`, tk)).json();
    return (j.files || [])[0] || null;
  }
  // Ventana de Google para elegir el archivo (solo la primera vez: así Google da permiso a la app para leerlo)
  function elegir(tk) {
    return new Promise((res, rej) => {
      gapi.load('picker', () => {
        const vista = new google.picker.DocsView(google.picker.ViewId.DOCS).setQuery(GOOGLE.archivoConfig).setIncludeFolders(true);
        new google.picker.PickerBuilder().setAppId(GOOGLE.proyecto).setOAuthToken(tk).setDeveloperKey(GOOGLE.apiKey)
          .setTitle('Elige el archivo ' + GOOGLE.archivoConfig).setLocale('es').addView(vista)
          .setCallback(d => {
            if (d.action === 'picked') res(d.docs[0]);
            else if (d.action === 'cancel') rej(new Error('No elegiste ningún archivo.'));
          }).build().setVisible(true);
      });
    });
  }
  // Devuelve { config, fileId }
  async function cargarConfig(fileIdGuardado) {
    const tk = await obtenerToken();
    if (fileIdGuardado) { try { return { config: await leerPorId(fileIdGuardado, tk), fileId: fileIdGuardado }; } catch (e) { if (e.status !== 404 && e.status !== 403) throw e; } }
    let f = await buscar(tk);
    if (!f) f = await elegir(tk);
    return { config: await leerPorId(f.id, tk), fileId: f.id };
  }
  return { cargarConfig };
})();
