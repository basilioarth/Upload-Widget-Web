#### Gerenciamento de estado

Gerenciamento de estado **não é** simplesmente a gente compartilhar uma informação atualizada entre dois componentes. Existem muitas ferramentas que fazem isso, mas a gente não pode chamar isso de gerenciamento de estado (isso é no máximo uma substituição pra context API). O gerenciamento de estado vai muito além disso.

Trata-se de fornecer uma forma unificada da gente realizar alterações/modificações nesse estado de uma maneira imutável e compartilhar essas informações entre os componentes. Então é como se a gente criasse um ponto/uma cental da verdade (temos até uma nomenclatura para isso: single source of truth).

#### ZUSTAND & JOTAI (Replacement pro Redux)

Apesar da sintaxe do **ZUSTAND** ser muito mais simples que a do **Redux**, eles **seguem a mesma ideia**: termos **um grande estado** e esse estado ser **compartilhado entre vários componentes**. Temos um grande estado compartilhado entre vários componentes, mas cada um desses componentes pode dizer exatamente o quê que ele precisa do estado para ser renderizado somente quando essas informações mudarem.

O **Jotai**, por sua vez, segue uma ideia de **átomos**: **pequenos estados que são compartilhados entre vários componentes**. A API do **Jotai** é **bem menos amigável** que a do **ZUSTAND**. O Jotai tem mais funcionalidades, mas 99% delas podem ser facilmente substituídas por funcionalidades do ZUSTAND.

#### Imutabilidade do React + Uso do Immer

No React, e no ZUSTAND isso não é diferente, quando vamos alterar o valor de uma informação nós **sempre temos que substituir essa informação por completo**. Em outras palavras, não podemos simplesmente modificar a informação. Por exemplo: se for um array, não podemos simplesmente adicionar mais um elemento ao final do array usando um array.push(element); temos que sempre retornar um array por inteiro usando, por exemplo, o recurso do spread: [...array, element].

O Immer nos ajuda com isso, pois **remove essa necessidade criada pela imutabilidade do React**. Com ele nós podemos fazer as alterações na variável da maneira que a gente quiser (sem ter que ficar retornando a informação por inteiro) e **o próprio Immer vai calcular como que ele tem que fazer essa alteração de uma maneira imutável**.