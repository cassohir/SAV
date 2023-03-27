export  const baseClinicaFields = [
    {
    name: 'email',
    label: 'Email',
    type: 'input',
    placeholder: 'email@veterinaria.com',
    required: true,
  
  },
  {
    name: 'nome',
    label: 'Nome',
    type: 'input',
    placeholder: 'Fulano de tal',
    required: true,
  
  },
  {
    name: 'nome',
    label: 'Nome',
    placeholder: 'Fulano de tal',
    required: true,
    type: 'select',
    dataFields: {
      options: [
        "Veterinario1",
        "Veterinario2",
      ]
    }
  },
  {
    name: 'endereco',
    label: 'Endereço',
    type: 'input',
    placeholder: 'Rua tal, 123',
    required: true,
  },
  {
    name: 'regiao',
    label: 'Região',
    type: 'input',
    placeholder: 'Norte',
    required: true,
  },
  {
    name: 'telefone',
    label: 'Telefone',
    type: 'number',
    placeholder: '(00) 99999-9999',
    required: true,
  },
  ];

  const fieldDataType = [
    {
    type: 'input',
    label: 'Nome',
    dataField: [
        {
          name: 'name',
          type: 'text',
          placeHolder: 'Joao',
       }
    ],
    },
    {
      type: 'select',
      label: 'Veterinários',
      dataField: [
        {
          name: 'Veterinário',
          options: ["Fernando", "Matheus", "Jéssica"]
        }
      ]
    }
    ]

