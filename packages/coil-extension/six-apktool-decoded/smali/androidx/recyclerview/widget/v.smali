.class final Landroidx/recyclerview/widget/v;
.super Landroidx/recyclerview/widget/w;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Landroidx/recyclerview/widget/w;->b(Landroidx/recyclerview/widget/D$h;)Landroidx/recyclerview/widget/w;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x8
    name = null
.end annotation


# direct methods
.method constructor <init>(Landroidx/recyclerview/widget/D$h;)V
    .locals 1

    const/4 v0, 0x0

    invoke-direct {p0, p1, v0}, Landroidx/recyclerview/widget/w;-><init>(Landroidx/recyclerview/widget/D$h;Landroidx/recyclerview/widget/u;)V

    return-void
.end method


# virtual methods
.method public a()I
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/w;->a:Landroidx/recyclerview/widget/D$h;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$h;->h()I

    move-result v0

    return v0
.end method

.method public a(Landroid/view/View;)I
    .locals 2

    invoke-virtual {p1}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object v0

    check-cast v0, Landroidx/recyclerview/widget/D$i;

    iget-object v1, p0, Landroidx/recyclerview/widget/w;->a:Landroidx/recyclerview/widget/D$h;

    invoke-virtual {v1, p1}, Landroidx/recyclerview/widget/D$h;->e(Landroid/view/View;)I

    move-result p1

    iget v0, v0, Landroid/view/ViewGroup$MarginLayoutParams;->bottomMargin:I

    add-int/2addr p1, v0

    return p1
.end method

.method public a(I)V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/w;->a:Landroidx/recyclerview/widget/D$h;

    invoke-virtual {v0, p1}, Landroidx/recyclerview/widget/D$h;->e(I)V

    return-void
.end method

.method public b()I
    .locals 2

    iget-object v0, p0, Landroidx/recyclerview/widget/w;->a:Landroidx/recyclerview/widget/D$h;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$h;->h()I

    move-result v0

    iget-object v1, p0, Landroidx/recyclerview/widget/w;->a:Landroidx/recyclerview/widget/D$h;

    invoke-virtual {v1}, Landroidx/recyclerview/widget/D$h;->m()I

    move-result v1

    sub-int/2addr v0, v1

    return v0
.end method

.method public b(Landroid/view/View;)I
    .locals 2

    invoke-virtual {p1}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object v0

    check-cast v0, Landroidx/recyclerview/widget/D$i;

    iget-object v1, p0, Landroidx/recyclerview/widget/w;->a:Landroidx/recyclerview/widget/D$h;

    invoke-virtual {v1, p1}, Landroidx/recyclerview/widget/D$h;->g(Landroid/view/View;)I

    move-result p1

    iget v1, v0, Landroid/view/ViewGroup$MarginLayoutParams;->topMargin:I

    add-int/2addr p1, v1

    iget v0, v0, Landroid/view/ViewGroup$MarginLayoutParams;->bottomMargin:I

    add-int/2addr p1, v0

    return p1
.end method

.method public c()I
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/w;->a:Landroidx/recyclerview/widget/D$h;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$h;->m()I

    move-result v0

    return v0
.end method

.method public c(Landroid/view/View;)I
    .locals 2

    invoke-virtual {p1}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object v0

    check-cast v0, Landroidx/recyclerview/widget/D$i;

    iget-object v1, p0, Landroidx/recyclerview/widget/w;->a:Landroidx/recyclerview/widget/D$h;

    invoke-virtual {v1, p1}, Landroidx/recyclerview/widget/D$h;->h(Landroid/view/View;)I

    move-result p1

    iget v1, v0, Landroid/view/ViewGroup$MarginLayoutParams;->leftMargin:I

    add-int/2addr p1, v1

    iget v0, v0, Landroid/view/ViewGroup$MarginLayoutParams;->rightMargin:I

    add-int/2addr p1, v0

    return p1
.end method

.method public d()I
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/w;->a:Landroidx/recyclerview/widget/D$h;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$h;->i()I

    move-result v0

    return v0
.end method

.method public d(Landroid/view/View;)I
    .locals 2

    invoke-virtual {p1}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object v0

    check-cast v0, Landroidx/recyclerview/widget/D$i;

    iget-object v1, p0, Landroidx/recyclerview/widget/w;->a:Landroidx/recyclerview/widget/D$h;

    invoke-virtual {v1, p1}, Landroidx/recyclerview/widget/D$h;->j(Landroid/view/View;)I

    move-result p1

    iget v0, v0, Landroid/view/ViewGroup$MarginLayoutParams;->topMargin:I

    sub-int/2addr p1, v0

    return p1
.end method

.method public e()I
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/w;->a:Landroidx/recyclerview/widget/D$h;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$h;->r()I

    move-result v0

    return v0
.end method

.method public e(Landroid/view/View;)I
    .locals 3

    iget-object v0, p0, Landroidx/recyclerview/widget/w;->a:Landroidx/recyclerview/widget/D$h;

    iget-object v1, p0, Landroidx/recyclerview/widget/w;->c:Landroid/graphics/Rect;

    const/4 v2, 0x1

    invoke-virtual {v0, p1, v2, v1}, Landroidx/recyclerview/widget/D$h;->a(Landroid/view/View;ZLandroid/graphics/Rect;)V

    iget-object p1, p0, Landroidx/recyclerview/widget/w;->c:Landroid/graphics/Rect;

    iget p1, p1, Landroid/graphics/Rect;->bottom:I

    return p1
.end method

.method public f()I
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/w;->a:Landroidx/recyclerview/widget/D$h;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$h;->p()I

    move-result v0

    return v0
.end method

.method public f(Landroid/view/View;)I
    .locals 3

    iget-object v0, p0, Landroidx/recyclerview/widget/w;->a:Landroidx/recyclerview/widget/D$h;

    iget-object v1, p0, Landroidx/recyclerview/widget/w;->c:Landroid/graphics/Rect;

    const/4 v2, 0x1

    invoke-virtual {v0, p1, v2, v1}, Landroidx/recyclerview/widget/D$h;->a(Landroid/view/View;ZLandroid/graphics/Rect;)V

    iget-object p1, p0, Landroidx/recyclerview/widget/w;->c:Landroid/graphics/Rect;

    iget p1, p1, Landroid/graphics/Rect;->top:I

    return p1
.end method

.method public g()I
    .locals 2

    iget-object v0, p0, Landroidx/recyclerview/widget/w;->a:Landroidx/recyclerview/widget/D$h;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$h;->h()I

    move-result v0

    iget-object v1, p0, Landroidx/recyclerview/widget/w;->a:Landroidx/recyclerview/widget/D$h;

    invoke-virtual {v1}, Landroidx/recyclerview/widget/D$h;->p()I

    move-result v1

    sub-int/2addr v0, v1

    iget-object v1, p0, Landroidx/recyclerview/widget/w;->a:Landroidx/recyclerview/widget/D$h;

    invoke-virtual {v1}, Landroidx/recyclerview/widget/D$h;->m()I

    move-result v1

    sub-int/2addr v0, v1

    return v0
.end method
