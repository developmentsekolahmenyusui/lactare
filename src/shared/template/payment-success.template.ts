interface Params {
  fullName: string;
  totalAmount: number;
  createdAt: Date;
  whatsappGroup: string;
}

export const paymentLinkSuccessTemplate = (params: Params) => {
  const formattedTotalAmount = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(params.totalAmount);

  const formattedCreatedAt = params.createdAt.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" lang="en">
      <head>
        <link
          rel="preload"
          as="image"
          href="https://uce23bd573b418b0892867ca3f30.previews.dropboxusercontent.com/p/thumb/AC2AuVhZX-IKnTsQYtsnTMWsqRZGm-I1Z-uxNExF-lnDG-y4EVyTjlVSDzqiPCRK4wATdswQrIArd3T6s4MfRMtYvPyuyQ4YQVeVOaN1wIAAlaZdGgCPRUe3fnYGa72Fx7y4-u1bFzxrN2dJbSzm0NxUdIN12dU7Af2LGf-n0O9p4nBchnaAcMLmwGF0qpg8KUizJDvLgFAUvk6754TbFQ010vG6sJ0Mx6pvwIfFPbCY6FTUuSUGbbD5wgqcQ7CJhdn6kisSRAfo9buaDLDl9NRkOEVsxeIBrIVo3UmUBzSMCcYHmctAfQp4rhokDWaSZIMBMMBNplmsdo9Udtkcas_3JEpz2XwEkaw9ng3cUTgbbiN3BoEqKbGx0yGg-c5nXu9Pg0RHGXq9oxFJReI0RgcA/p.png?is_prewarmed=true" />
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        <meta name="x-apple-disable-message-reformatting" />
        <style>
          @font-face {
            font-family: 'Alan Sans';
            font-style: normal;
            font-weight: 400;
            mso-font-alt: 'Verdana';
            src: url(https://fonts.gstatic.com/s/alansans/v1/pxiByp4S8sGd6pYq9mQ.woff2) format('woff2');
          }

          * {
            font-family: 'Alan Sans', Verdana;
          }
        </style>
      </head>
      <body class="font-stack-overflow">
        <!--$--><!--html--><!--head--><!--body-->
        <table
          border="0"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          align="center">
          <tbody>
            <tr>
              <td>
                <div
                  style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
                  data-skip-in-text="true">
                  Konfirmasi pembayaran berhasil Program Sekolah Menyusui.id
                  <div>
                     ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
                  </div>
                </div>
                <table
                  align="center"
                  width="100%"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="max-width:560px;margin-right:auto;margin-left:auto;margin-bottom:0rem;margin-top:0rem;padding-right:0rem;padding-left:0rem;padding-top:1.25rem;padding-bottom:3rem">
                  <tbody>
                    <tr style="width:100%">
                      <td>
                        <table
                          align="center"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation">
                          <tbody style="width:100%">
                            <tr style="width:100%">
                              <img
                                src="https://uce23bd573b418b0892867ca3f30.previews.dropboxusercontent.com/p/thumb/AC2AuVhZX-IKnTsQYtsnTMWsqRZGm-I1Z-uxNExF-lnDG-y4EVyTjlVSDzqiPCRK4wATdswQrIArd3T6s4MfRMtYvPyuyQ4YQVeVOaN1wIAAlaZdGgCPRUe3fnYGa72Fx7y4-u1bFzxrN2dJbSzm0NxUdIN12dU7Af2LGf-n0O9p4nBchnaAcMLmwGF0qpg8KUizJDvLgFAUvk6754TbFQ010vG6sJ0Mx6pvwIfFPbCY6FTUuSUGbbD5wgqcQ7CJhdn6kisSRAfo9buaDLDl9NRkOEVsxeIBrIVo3UmUBzSMCcYHmctAfQp4rhokDWaSZIMBMMBNplmsdo9Udtkcas_3JEpz2XwEkaw9ng3cUTgbbiN3BoEqKbGx0yGg-c5nXu9Pg0RHGXq9oxFJReI0RgcA/p.png?is_prewarmed=true"
                                style="display:block;outline:none;border:none;text-decoration:none;max-width:100%"
                                width="320" />
                            </tr>
                          </tbody>
                        </table>
                        <h2
                          style="margin-top:0rem;margin-bottom:15px;font-size:21px;line-height:1;font-weight:700;color:rgb(12,13,14)">
                          Terima kasih,
                          <!-- -->${params.fullName}<!-- -->. <br />Kami telah menerima
                          pembayaran untuk pendaftaran Program Sekolah Menyusui
                        </h2>
                        <p
                          style="font-size:15px;line-height:21px;color:rgb(60,63,68);margin-top:16px;margin-bottom:16px">
                          Berikut ringkasan data pendaftaran dan pembayaran:
                        </p>
                        <ul
                          style="list-style-type:disc;padding-left:1.5rem;font-size:1rem;line-height:1.5;color:rgb(60,63,68)">
                          <li>Nama Pendaftar: <b>${params.fullName}</b></li>
                          <li>Total Harga: <b>${formattedTotalAmount}</b></li>
                          <li>Waktu Pengisian: <b>${formattedCreatedAt}</b></li>
                          <li>Status Pembayaran: <b>Berhasil</b></li>
                        </ul>
                        <p
                          style="font-size:15px;line-height:21px;color:rgb(60,63,68);font-weight:600;margin-top:16px;margin-bottom:16px">
                          Silakan bergabung ke Grup WhatsApp melalui tombol di bawah
                          ini
                        </p>
                        <table
                          align="center"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="padding-right:0rem;padding-left:0rem;padding-bottom:1rem;padding-top:1rem">
                          <tbody>
                            <tr>
                              <td>
                                <a
                                  href="${params.whatsappGroup}"
                                  style="line-height:100%;text-decoration:none;display:block;max-width:100%;mso-padding-alt:0px;border-radius:0.25rem;background-color:rgb(227,148,205);padding-right:23px;padding-left:23px;padding-bottom:11px;padding-top:11px;text-align:center;font-size:15px;font-weight:600;color:rgb(255,255,255);text-decoration-line:none"
                                  target="_blank"
                                  ><span
                                    ><!--[if mso
                                      ]><i
                                        style="mso-font-width:383.33333333333337%;mso-text-raise:16.5"
                                        hidden
                                        >&#8202;&#8202;&#8202;</i
                                      ><!
                                    [endif]--></span
                                  ><span
                                    style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:8.25px"
                                    >Masuk ke Group Whatsapp</span
                                  ><span
                                    ><!--[if mso
                                      ]><i
                                        style="mso-font-width:383.33333333333337%"
                                        hidden
                                        >&#8202;&#8202;&#8202;&#8203;</i
                                      ><!
                                    [endif]--></span
                                  ></a
                                >
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <!--/$-->
      </body>
    </html>
  `;
};
