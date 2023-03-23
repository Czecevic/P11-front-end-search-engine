class DropBox {
  constructor(dataArray, type) {
    this.dataArray = dataArray;
    this.type = type;
  }

  createListItems() {
    let template = "";
    dataArray.forEach((element) => {
      let text = this.element;
      text = transformText(text, "titlecase", false);
      template += `
      <li class="search-list-${this.type}">${text}</li>
      `;
    });
    return template;
  }
}
