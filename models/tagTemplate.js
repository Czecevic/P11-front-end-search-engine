class Tagtemplate {
  constructor(tagText, tagType) {
    this.tagText = tagText;
    this.tagType = tagType;
  }

  createTag() {
    const divTag = document.createElement("div");
    divTag.classList.add("tag-${this.tagType}");

    const spanTag = document.createElement("span");
    spanTag.innerHTML = this.tagText;

    const buttonCloseTag = document.createElement("button");
    buttonCloseTag.classList.add("remove-tag");

    buttonCloseTag.addEventListener("click", removeTag);

    divTag.appendChild(spanTag);
    divTag.appendChild(buttonCloseTag);

    return divTag;
  }
}

/* `<div class="tag-${tagType}">
        <span>${tag}</span>
        <button class="remove-tag">x</button>
    </div>` 
*/
