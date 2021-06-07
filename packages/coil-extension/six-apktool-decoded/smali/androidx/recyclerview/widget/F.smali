.class Landroidx/recyclerview/widget/F;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Landroidx/recyclerview/widget/N$b;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/recyclerview/widget/D$h;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Landroidx/recyclerview/widget/D$h;


# direct methods
.method constructor <init>(Landroidx/recyclerview/widget/D$h;)V
    .locals 0

    iput-object p1, p0, Landroidx/recyclerview/widget/F;->a:Landroidx/recyclerview/widget/D$h;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public a()I
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/F;->a:Landroidx/recyclerview/widget/D$h;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$h;->p()I

    move-result v0

    return v0
.end method

.method public a(Landroid/view/View;)I
    .locals 2

    invoke-virtual {p1}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object v0

    check-cast v0, Landroidx/recyclerview/widget/D$i;

    iget-object v1, p0, Landroidx/recyclerview/widget/F;->a:Landroidx/recyclerview/widget/D$h;

    invoke-virtual {v1, p1}, Landroidx/recyclerview/widget/D$h;->j(Landroid/view/View;)I

    move-result p1

    iget v0, v0, Landroid/view/ViewGroup$MarginLayoutParams;->topMargin:I

    sub-int/2addr p1, v0

    return p1
.end method

.method public a(I)Landroid/view/View;
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/F;->a:Landroidx/recyclerview/widget/D$h;

    invoke-virtual {v0, p1}, Landroidx/recyclerview/widget/D$h;->c(I)Landroid/view/View;

    move-result-object p1

    return-object p1
.end method

.method public b()I
    .locals 2

    iget-object v0, p0, Landroidx/recyclerview/widget/F;->a:Landroidx/recyclerview/widget/D$h;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$h;->h()I

    move-result v0

    iget-object v1, p0, Landroidx/recyclerview/widget/F;->a:Landroidx/recyclerview/widget/D$h;

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

    iget-object v1, p0, Landroidx/recyclerview/widget/F;->a:Landroidx/recyclerview/widget/D$h;

    invoke-virtual {v1, p1}, Landroidx/recyclerview/widget/D$h;->e(Landroid/view/View;)I

    move-result p1

    iget v0, v0, Landroid/view/ViewGroup$MarginLayoutParams;->bottomMargin:I

    add-int/2addr p1, v0

    return p1
.end method
