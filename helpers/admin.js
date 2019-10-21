const getLayout = ({ page_title, site, root }) =>  {

  return `
    <!DOCTYPE html>
    <html class="h-full">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">

        <title>
          ${page_title} | ${site.name} | ${site.description}
        </title>

        <link href="https://fonts.googleapis.com/css?family=Work+Sans:400,500" rel="stylesheet">

        <script defer="defer" src="/admin/assets/admin.bundle.js"></script>
        ${root}
      </head>
      <body class="bg-grey-lightest min-h-full font-sans flex">
        <main id="admin">
        </main>
      </body>
    </html>
  `
}

const getForm = ({ page_title, site, root, template, errors, form }) => {
  return `
    <!DOCTYPE html>
    <html class="h-full">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">

        <title>
          ${page_title} | ${site.name} | ${site.description}
        </title>

        <link href="https://fonts.googleapis.com/css?family=Work+Sans:400,500" rel="stylesheet">

        <script defer="defer" src="/admin/assets/${template }.bundle.js"></script>
        <script id="data">
          window.siteData = {
            template: '${template}',
            errors: ${errors ? JSON.stringify(errors) : `[]`},
            form: ${form ? JSON.stringify(form) : `{}`},
          }
        </script>
        ${root}
      </head>
      <body class="bg-grey-lightest min-h-full font-sans flex">
        <main id="${template === '404' ? `FourOhFour` : template}">
        </main>
      </body>
    </html>
  `

}

const getRoot = () => {
  return `
    <style>
      :root {
        --transparent: transparent;
        --primary: #BE52F2;
        --primary-light: #DBA5F5;
        --primary-lighter: #EEDFF2;
        --accent: #6979F8;
        --accent-light: #A5AFFB;
        --accent-lighter: #E5E7FA;
        --yellow: #FFCF5C;
        --yellow-light: #FFE29D;
        --yellow-lighter: #FFF8E7;
        --orange: #FFA26B;
        --orange-light: #FFC7A6;
        --orange-lighter: #FFE8DA;
        --cyan: #0084F4;
        --cyan-light: #66B5F8;
        --cyan-lighter: #D5E9FA;
        --green: #00C48C;
        --green-light: #7DDFC3;
        --green-lighter: #D5F2EA;
        --pink: #FF647C;
        --pink-light: #FDAFBB;
        --pink-lighter: #FBE4E8;
        --black: #1A051D;
        --grey: #3F3356;
        --grey-light: #D0C9D6;
        --grey-lighter: #ECE9F1;
        --grey-lightest: #F7F5F9;
        --white: #ffffff;
      }
    </style>
  `
}

exports.getAdmin = ({ page_title, site }) => {
  const root = getRoot();
  return getLayout({ page_title, site, root });
}
exports.getLogin = ({ page_title, site, template }) => {
  const root = getRoot();
  return getForm({ page_title, site, root, template })
}
