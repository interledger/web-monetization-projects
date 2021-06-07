.class public abstract Landroidx/recyclerview/widget/J;
.super Landroidx/recyclerview/widget/D$e;
.source ""


# instance fields
.field g:Z


# direct methods
.method public constructor <init>()V
    .locals 1

    invoke-direct {p0}, Landroidx/recyclerview/widget/D$e;-><init>()V

    const/4 v0, 0x1

    iput-boolean v0, p0, Landroidx/recyclerview/widget/J;->g:Z

    return-void
.end method


# virtual methods
.method public final a(Landroidx/recyclerview/widget/D$w;Z)V
    .locals 0

    invoke-virtual {p0, p1, p2}, Landroidx/recyclerview/widget/J;->c(Landroidx/recyclerview/widget/D$w;Z)V

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/D$e;->c(Landroidx/recyclerview/widget/D$w;)V

    return-void
.end method

.method public abstract a(Landroidx/recyclerview/widget/D$w;IIII)Z
.end method

.method public a(Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$e$c;Landroidx/recyclerview/widget/D$e$c;)Z
    .locals 8

    if-eqz p2, :cond_1

    iget v0, p2, Landroidx/recyclerview/widget/D$e$c;->a:I

    iget v1, p3, Landroidx/recyclerview/widget/D$e$c;->a:I

    if-ne v0, v1, :cond_0

    iget v0, p2, Landroidx/recyclerview/widget/D$e$c;->b:I

    iget v1, p3, Landroidx/recyclerview/widget/D$e$c;->b:I

    if-eq v0, v1, :cond_1

    :cond_0
    iget v4, p2, Landroidx/recyclerview/widget/D$e$c;->a:I

    iget v5, p2, Landroidx/recyclerview/widget/D$e$c;->b:I

    iget v6, p3, Landroidx/recyclerview/widget/D$e$c;->a:I

    iget v7, p3, Landroidx/recyclerview/widget/D$e$c;->b:I

    move-object v2, p0

    move-object v3, p1

    invoke-virtual/range {v2 .. v7}, Landroidx/recyclerview/widget/J;->a(Landroidx/recyclerview/widget/D$w;IIII)Z

    move-result p1

    return p1

    :cond_1
    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/J;->f(Landroidx/recyclerview/widget/D$w;)Z

    move-result p1

    return p1
.end method

.method public abstract a(Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$w;IIII)Z
.end method

.method public a(Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$e$c;Landroidx/recyclerview/widget/D$e$c;)Z
    .locals 7

    iget v3, p3, Landroidx/recyclerview/widget/D$e$c;->a:I

    iget v4, p3, Landroidx/recyclerview/widget/D$e$c;->b:I

    invoke-virtual {p2}, Landroidx/recyclerview/widget/D$w;->x()Z

    move-result v0

    if-eqz v0, :cond_0

    iget p4, p3, Landroidx/recyclerview/widget/D$e$c;->a:I

    iget p3, p3, Landroidx/recyclerview/widget/D$e$c;->b:I

    move v6, p3

    move v5, p4

    goto :goto_0

    :cond_0
    iget p3, p4, Landroidx/recyclerview/widget/D$e$c;->a:I

    iget p4, p4, Landroidx/recyclerview/widget/D$e$c;->b:I

    move v5, p3

    move v6, p4

    :goto_0
    move-object v0, p0

    move-object v1, p1

    move-object v2, p2

    invoke-virtual/range {v0 .. v6}, Landroidx/recyclerview/widget/J;->a(Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$w;IIII)Z

    move-result p1

    return p1
.end method

.method public final b(Landroidx/recyclerview/widget/D$w;Z)V
    .locals 0

    invoke-virtual {p0, p1, p2}, Landroidx/recyclerview/widget/J;->d(Landroidx/recyclerview/widget/D$w;Z)V

    return-void
.end method

.method public b(Landroidx/recyclerview/widget/D$w;)Z
    .locals 1

    iget-boolean v0, p0, Landroidx/recyclerview/widget/J;->g:Z

    if-eqz v0, :cond_1

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$w;->n()Z

    move-result p1

    if-eqz p1, :cond_0

    goto :goto_0

    :cond_0
    const/4 p1, 0x0

    goto :goto_1

    :cond_1
    :goto_0
    const/4 p1, 0x1

    :goto_1
    return p1
.end method

.method public b(Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$e$c;Landroidx/recyclerview/widget/D$e$c;)Z
    .locals 6

    iget v2, p2, Landroidx/recyclerview/widget/D$e$c;->a:I

    iget v3, p2, Landroidx/recyclerview/widget/D$e$c;->b:I

    iget-object p2, p1, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    if-nez p3, :cond_0

    invoke-virtual {p2}, Landroid/view/View;->getLeft()I

    move-result v0

    goto :goto_0

    :cond_0
    iget v0, p3, Landroidx/recyclerview/widget/D$e$c;->a:I

    :goto_0
    move v4, v0

    if-nez p3, :cond_1

    invoke-virtual {p2}, Landroid/view/View;->getTop()I

    move-result p3

    goto :goto_1

    :cond_1
    iget p3, p3, Landroidx/recyclerview/widget/D$e$c;->b:I

    :goto_1
    move v5, p3

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$w;->p()Z

    move-result p3

    if-nez p3, :cond_3

    if-ne v2, v4, :cond_2

    if-eq v3, v5, :cond_3

    :cond_2
    invoke-virtual {p2}, Landroid/view/View;->getWidth()I

    move-result p3

    add-int/2addr p3, v4

    invoke-virtual {p2}, Landroid/view/View;->getHeight()I

    move-result v0

    add-int/2addr v0, v5

    invoke-virtual {p2, v4, v5, p3, v0}, Landroid/view/View;->layout(IIII)V

    move-object v0, p0

    move-object v1, p1

    invoke-virtual/range {v0 .. v5}, Landroidx/recyclerview/widget/J;->a(Landroidx/recyclerview/widget/D$w;IIII)Z

    move-result p1

    return p1

    :cond_3
    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/J;->g(Landroidx/recyclerview/widget/D$w;)Z

    move-result p1

    return p1
.end method

.method public c(Landroidx/recyclerview/widget/D$w;Z)V
    .locals 0

    return-void
.end method

.method public c(Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$e$c;Landroidx/recyclerview/widget/D$e$c;)Z
    .locals 6

    iget v0, p2, Landroidx/recyclerview/widget/D$e$c;->a:I

    iget v1, p3, Landroidx/recyclerview/widget/D$e$c;->a:I

    if-ne v0, v1, :cond_1

    iget v0, p2, Landroidx/recyclerview/widget/D$e$c;->b:I

    iget v1, p3, Landroidx/recyclerview/widget/D$e$c;->b:I

    if-eq v0, v1, :cond_0

    goto :goto_0

    :cond_0
    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/J;->j(Landroidx/recyclerview/widget/D$w;)V

    const/4 p1, 0x0

    return p1

    :cond_1
    :goto_0
    iget v2, p2, Landroidx/recyclerview/widget/D$e$c;->a:I

    iget v3, p2, Landroidx/recyclerview/widget/D$e$c;->b:I

    iget v4, p3, Landroidx/recyclerview/widget/D$e$c;->a:I

    iget v5, p3, Landroidx/recyclerview/widget/D$e$c;->b:I

    move-object v0, p0

    move-object v1, p1

    invoke-virtual/range {v0 .. v5}, Landroidx/recyclerview/widget/J;->a(Landroidx/recyclerview/widget/D$w;IIII)Z

    move-result p1

    return p1
.end method

.method public d(Landroidx/recyclerview/widget/D$w;Z)V
    .locals 0

    return-void
.end method

.method public abstract f(Landroidx/recyclerview/widget/D$w;)Z
.end method

.method public abstract g(Landroidx/recyclerview/widget/D$w;)Z
.end method

.method public final h(Landroidx/recyclerview/widget/D$w;)V
    .locals 0

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/J;->n(Landroidx/recyclerview/widget/D$w;)V

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/D$e;->c(Landroidx/recyclerview/widget/D$w;)V

    return-void
.end method

.method public final i(Landroidx/recyclerview/widget/D$w;)V
    .locals 0

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/J;->o(Landroidx/recyclerview/widget/D$w;)V

    return-void
.end method

.method public final j(Landroidx/recyclerview/widget/D$w;)V
    .locals 0

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/J;->p(Landroidx/recyclerview/widget/D$w;)V

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/D$e;->c(Landroidx/recyclerview/widget/D$w;)V

    return-void
.end method

.method public final k(Landroidx/recyclerview/widget/D$w;)V
    .locals 0

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/J;->q(Landroidx/recyclerview/widget/D$w;)V

    return-void
.end method

.method public final l(Landroidx/recyclerview/widget/D$w;)V
    .locals 0

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/J;->r(Landroidx/recyclerview/widget/D$w;)V

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/D$e;->c(Landroidx/recyclerview/widget/D$w;)V

    return-void
.end method

.method public final m(Landroidx/recyclerview/widget/D$w;)V
    .locals 0

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/J;->s(Landroidx/recyclerview/widget/D$w;)V

    return-void
.end method

.method public n(Landroidx/recyclerview/widget/D$w;)V
    .locals 0

    return-void
.end method

.method public o(Landroidx/recyclerview/widget/D$w;)V
    .locals 0

    return-void
.end method

.method public p(Landroidx/recyclerview/widget/D$w;)V
    .locals 0

    return-void
.end method

.method public q(Landroidx/recyclerview/widget/D$w;)V
    .locals 0

    return-void
.end method

.method public r(Landroidx/recyclerview/widget/D$w;)V
    .locals 0

    return-void
.end method

.method public s(Landroidx/recyclerview/widget/D$w;)V
    .locals 0

    return-void
.end method
