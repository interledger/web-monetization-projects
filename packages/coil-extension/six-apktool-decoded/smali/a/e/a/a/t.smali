.class public La/e/a/a/t;
.super La/e/a/a/h;
.source ""


# instance fields
.field protected va:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "La/e/a/a/h;",
            ">;"
        }
    .end annotation
.end field


# direct methods
.method public constructor <init>()V
    .locals 1

    invoke-direct {p0}, La/e/a/a/h;-><init>()V

    new-instance v0, Ljava/util/ArrayList;

    invoke-direct {v0}, Ljava/util/ArrayList;-><init>()V

    iput-object v0, p0, La/e/a/a/t;->va:Ljava/util/ArrayList;

    return-void
.end method


# virtual methods
.method public D()V
    .locals 1

    iget-object v0, p0, La/e/a/a/t;->va:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->clear()V

    invoke-super {p0}, La/e/a/a/h;->D()V

    return-void
.end method

.method public H()V
    .locals 5

    invoke-super {p0}, La/e/a/a/h;->H()V

    iget-object v0, p0, La/e/a/a/t;->va:Ljava/util/ArrayList;

    if-nez v0, :cond_0

    return-void

    :cond_0
    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    const/4 v1, 0x0

    :goto_0
    if-ge v1, v0, :cond_2

    iget-object v2, p0, La/e/a/a/t;->va:Ljava/util/ArrayList;

    invoke-virtual {v2, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, La/e/a/a/h;

    invoke-virtual {p0}, La/e/a/a/h;->g()I

    move-result v3

    invoke-virtual {p0}, La/e/a/a/h;->h()I

    move-result v4

    invoke-virtual {v2, v3, v4}, La/e/a/a/h;->b(II)V

    instance-of v3, v2, La/e/a/a/i;

    if-nez v3, :cond_1

    invoke-virtual {v2}, La/e/a/a/h;->H()V

    :cond_1
    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_2
    return-void
.end method

.method public J()La/e/a/a/i;
    .locals 4

    invoke-virtual {p0}, La/e/a/a/h;->k()La/e/a/a/h;

    move-result-object v0

    instance-of v1, p0, La/e/a/a/i;

    if-eqz v1, :cond_0

    move-object v1, p0

    check-cast v1, La/e/a/a/i;

    goto :goto_0

    :cond_0
    const/4 v1, 0x0

    :goto_0
    if-eqz v0, :cond_2

    invoke-virtual {v0}, La/e/a/a/h;->k()La/e/a/a/h;

    move-result-object v2

    instance-of v3, v0, La/e/a/a/i;

    if-eqz v3, :cond_1

    move-object v1, v0

    check-cast v1, La/e/a/a/i;

    :cond_1
    move-object v0, v2

    goto :goto_0

    :cond_2
    return-object v1
.end method

.method public K()V
    .locals 4

    invoke-virtual {p0}, La/e/a/a/t;->H()V

    iget-object v0, p0, La/e/a/a/t;->va:Ljava/util/ArrayList;

    if-nez v0, :cond_0

    return-void

    :cond_0
    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    const/4 v1, 0x0

    :goto_0
    if-ge v1, v0, :cond_2

    iget-object v2, p0, La/e/a/a/t;->va:Ljava/util/ArrayList;

    invoke-virtual {v2, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, La/e/a/a/h;

    instance-of v3, v2, La/e/a/a/t;

    if-eqz v3, :cond_1

    check-cast v2, La/e/a/a/t;

    invoke-virtual {v2}, La/e/a/a/t;->K()V

    :cond_1
    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_2
    return-void
.end method

.method public L()V
    .locals 1

    iget-object v0, p0, La/e/a/a/t;->va:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->clear()V

    return-void
.end method

.method public a(La/e/a/c;)V
    .locals 3

    invoke-super {p0, p1}, La/e/a/a/h;->a(La/e/a/c;)V

    iget-object v0, p0, La/e/a/a/t;->va:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    const/4 v1, 0x0

    :goto_0
    if-ge v1, v0, :cond_0

    iget-object v2, p0, La/e/a/a/t;->va:Ljava/util/ArrayList;

    invoke-virtual {v2, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, La/e/a/a/h;

    invoke-virtual {v2, p1}, La/e/a/a/h;->a(La/e/a/c;)V

    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_0
    return-void
.end method

.method public b(II)V
    .locals 3

    invoke-super {p0, p1, p2}, La/e/a/a/h;->b(II)V

    iget-object p1, p0, La/e/a/a/t;->va:Ljava/util/ArrayList;

    invoke-virtual {p1}, Ljava/util/ArrayList;->size()I

    move-result p1

    const/4 p2, 0x0

    :goto_0
    if-ge p2, p1, :cond_0

    iget-object v0, p0, La/e/a/a/t;->va:Ljava/util/ArrayList;

    invoke-virtual {v0, p2}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, La/e/a/a/h;

    invoke-virtual {p0}, La/e/a/a/h;->o()I

    move-result v1

    invoke-virtual {p0}, La/e/a/a/h;->p()I

    move-result v2

    invoke-virtual {v0, v1, v2}, La/e/a/a/h;->b(II)V

    add-int/lit8 p2, p2, 0x1

    goto :goto_0

    :cond_0
    return-void
.end method

.method public b(La/e/a/a/h;)V
    .locals 1

    iget-object v0, p0, La/e/a/a/t;->va:Ljava/util/ArrayList;

    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    invoke-virtual {p1}, La/e/a/a/h;->k()La/e/a/a/h;

    move-result-object v0

    if-eqz v0, :cond_0

    invoke-virtual {p1}, La/e/a/a/h;->k()La/e/a/a/h;

    move-result-object v0

    check-cast v0, La/e/a/a/t;

    invoke-virtual {v0, p1}, La/e/a/a/t;->c(La/e/a/a/h;)V

    :cond_0
    invoke-virtual {p1, p0}, La/e/a/a/h;->a(La/e/a/a/h;)V

    return-void
.end method

.method public c(La/e/a/a/h;)V
    .locals 1

    iget-object v0, p0, La/e/a/a/t;->va:Ljava/util/ArrayList;

    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->remove(Ljava/lang/Object;)Z

    const/4 v0, 0x0

    invoke-virtual {p1, v0}, La/e/a/a/h;->a(La/e/a/a/h;)V

    return-void
.end method
