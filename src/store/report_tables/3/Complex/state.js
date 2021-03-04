export default {
  editedIndex: -1,
  editedItem: {
    typework: "",
    MDK: "",
    smaterials: "",
    score: 0,
  },
  defaultItem: {
    title: "",
    quantity: 0,
    score: 0,
  },
  columns: [
    {
      name: "typework",
      label: "Вид работ",
      align: "center",
      field:"typework"
    },
    {
      name: "MDK",
      align: "center",
      label: "УД, МДК",
      field: "MDK",
    },
    {
      name: "materials",
      align: "center",
      label: "Количество материалов",
      field: "materials",
    },
    {
      name: "score",
      align: "center",
      label: "Баллы",
      field: "score",
      style: "width:100px"
    },
    {
      name: "actions",
      label: "Actions",
      field: "actions",
      align: "center",
    }
  ],
  rows: [
    {
      interesting: "Теоретический материал",
      typework: "",
      MDK: "",
      smaterials: "",
      score: 0,
    },
    {
      interesting:"Комплекты КОС, тесты",
      typework: "",
      MDK: "",
      smaterials: "",
      score: 0,
    },
    {
      interesting:"Электронные презентаци",
      typework: "",
      MDK: "",
      smaterials: "",
      score: 0,
    },
    {
      interesting:"Видеоматериалы",
      typework: "",
      MDK: "",
      smaterials: "",
      score: 0,
    },
  ]
};
