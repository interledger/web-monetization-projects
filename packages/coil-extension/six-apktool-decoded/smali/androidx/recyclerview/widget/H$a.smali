.class public Landroidx/recyclerview/widget/H$a;
.super La/g/i/a;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/recyclerview/widget/H;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x9
    name = "a"
.end annotation


# instance fields
.field final c:Landroidx/recyclerview/widget/H;


# direct methods
.method public constructor <init>(Landroidx/recyclerview/widget/H;)V
    .locals 0

    invoke-direct {p0}, La/g/i/a;-><init>()V

    iput-object p1, p0, Landroidx/recyclerview/widget/H$a;->c:Landroidx/recyclerview/widget/H;

    return-void
.end method


# virtual methods
.method public a(Landroid/view/View;La/g/i/a/c;)V
    .locals 1

    invoke-super {p0, p1, p2}, La/g/i/a;->a(Landroid/view/View;La/g/i/a/c;)V

    iget-object v0, p0, Landroidx/recyclerview/widget/H$a;->c:Landroidx/recyclerview/widget/H;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/H;->c()Z

    move-result v0

    if-nez v0, :cond_0

    iget-object v0, p0, Landroidx/recyclerview/widget/H$a;->c:Landroidx/recyclerview/widget/H;

    iget-object v0, v0, Landroidx/recyclerview/widget/H;->c:Landroidx/recyclerview/widget/D;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D;->getLayoutManager()Landroidx/recyclerview/widget/D$h;

    move-result-object v0

    if-eqz v0, :cond_0

    iget-object v0, p0, Landroidx/recyclerview/widget/H$a;->c:Landroidx/recyclerview/widget/H;

    iget-object v0, v0, Landroidx/recyclerview/widget/H;->c:Landroidx/recyclerview/widget/D;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D;->getLayoutManager()Landroidx/recyclerview/widget/D$h;

    move-result-object v0

    invoke-virtual {v0, p1, p2}, Landroidx/recyclerview/widget/D$h;->a(Landroid/view/View;La/g/i/a/c;)V

    :cond_0
    return-void
.end method

.method public a(Landroid/view/View;ILandroid/os/Bundle;)Z
    .locals 1

    invoke-super {p0, p1, p2, p3}, La/g/i/a;->a(Landroid/view/View;ILandroid/os/Bundle;)Z

    move-result v0

    if-eqz v0, :cond_0

    const/4 p1, 0x1

    return p1

    :cond_0
    iget-object v0, p0, Landroidx/recyclerview/widget/H$a;->c:Landroidx/recyclerview/widget/H;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/H;->c()Z

    move-result v0

    if-nez v0, :cond_1

    iget-object v0, p0, Landroidx/recyclerview/widget/H$a;->c:Landroidx/recyclerview/widget/H;

    iget-object v0, v0, Landroidx/recyclerview/widget/H;->c:Landroidx/recyclerview/widget/D;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D;->getLayoutManager()Landroidx/recyclerview/widget/D$h;

    move-result-object v0

    if-eqz v0, :cond_1

    iget-object v0, p0, Landroidx/recyclerview/widget/H$a;->c:Landroidx/recyclerview/widget/H;

    iget-object v0, v0, Landroidx/recyclerview/widget/H;->c:Landroidx/recyclerview/widget/D;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D;->getLayoutManager()Landroidx/recyclerview/widget/D$h;

    move-result-object v0

    invoke-virtual {v0, p1, p2, p3}, Landroidx/recyclerview/widget/D$h;->a(Landroid/view/View;ILandroid/os/Bundle;)Z

    move-result p1

    return p1

    :cond_1
    const/4 p1, 0x0

    return p1
.end method
