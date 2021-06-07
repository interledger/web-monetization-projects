.class Landroidx/recyclerview/widget/C;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Landroidx/recyclerview/widget/a$a;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Landroidx/recyclerview/widget/D;->k()V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Landroidx/recyclerview/widget/D;


# direct methods
.method constructor <init>(Landroidx/recyclerview/widget/D;)V
    .locals 0

    iput-object p1, p0, Landroidx/recyclerview/widget/C;->a:Landroidx/recyclerview/widget/D;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public a(I)Landroidx/recyclerview/widget/D$w;
    .locals 3

    iget-object v0, p0, Landroidx/recyclerview/widget/C;->a:Landroidx/recyclerview/widget/D;

    const/4 v1, 0x1

    invoke-virtual {v0, p1, v1}, Landroidx/recyclerview/widget/D;->a(IZ)Landroidx/recyclerview/widget/D$w;

    move-result-object p1

    const/4 v0, 0x0

    if-nez p1, :cond_0

    return-object v0

    :cond_0
    iget-object v1, p0, Landroidx/recyclerview/widget/C;->a:Landroidx/recyclerview/widget/D;

    iget-object v1, v1, Landroidx/recyclerview/widget/D;->o:Landroidx/recyclerview/widget/b;

    iget-object v2, p1, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    invoke-virtual {v1, v2}, Landroidx/recyclerview/widget/b;->c(Landroid/view/View;)Z

    move-result v1

    if-eqz v1, :cond_1

    return-object v0

    :cond_1
    return-object p1
.end method

.method public a(II)V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/C;->a:Landroidx/recyclerview/widget/D;

    invoke-virtual {v0, p1, p2}, Landroidx/recyclerview/widget/D;->g(II)V

    iget-object p1, p0, Landroidx/recyclerview/widget/C;->a:Landroidx/recyclerview/widget/D;

    const/4 p2, 0x1

    iput-boolean p2, p1, Landroidx/recyclerview/widget/D;->ua:Z

    return-void
.end method

.method public a(IILjava/lang/Object;)V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/C;->a:Landroidx/recyclerview/widget/D;

    invoke-virtual {v0, p1, p2, p3}, Landroidx/recyclerview/widget/D;->a(IILjava/lang/Object;)V

    iget-object p1, p0, Landroidx/recyclerview/widget/C;->a:Landroidx/recyclerview/widget/D;

    const/4 p2, 0x1

    iput-boolean p2, p1, Landroidx/recyclerview/widget/D;->va:Z

    return-void
.end method

.method public a(Landroidx/recyclerview/widget/a$b;)V
    .locals 0

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/C;->c(Landroidx/recyclerview/widget/a$b;)V

    return-void
.end method

.method public b(II)V
    .locals 2

    iget-object v0, p0, Landroidx/recyclerview/widget/C;->a:Landroidx/recyclerview/widget/D;

    const/4 v1, 0x0

    invoke-virtual {v0, p1, p2, v1}, Landroidx/recyclerview/widget/D;->a(IIZ)V

    iget-object p1, p0, Landroidx/recyclerview/widget/C;->a:Landroidx/recyclerview/widget/D;

    const/4 p2, 0x1

    iput-boolean p2, p1, Landroidx/recyclerview/widget/D;->ua:Z

    return-void
.end method

.method public b(Landroidx/recyclerview/widget/a$b;)V
    .locals 0

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/C;->c(Landroidx/recyclerview/widget/a$b;)V

    return-void
.end method

.method public c(II)V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/C;->a:Landroidx/recyclerview/widget/D;

    invoke-virtual {v0, p1, p2}, Landroidx/recyclerview/widget/D;->f(II)V

    iget-object p1, p0, Landroidx/recyclerview/widget/C;->a:Landroidx/recyclerview/widget/D;

    const/4 p2, 0x1

    iput-boolean p2, p1, Landroidx/recyclerview/widget/D;->ua:Z

    return-void
.end method

.method c(Landroidx/recyclerview/widget/a$b;)V
    .locals 4

    iget v0, p1, Landroidx/recyclerview/widget/a$b;->a:I

    const/4 v1, 0x1

    if-eq v0, v1, :cond_3

    const/4 v2, 0x2

    if-eq v0, v2, :cond_2

    const/4 v2, 0x4

    if-eq v0, v2, :cond_1

    const/16 v2, 0x8

    if-eq v0, v2, :cond_0

    goto :goto_0

    :cond_0
    iget-object v0, p0, Landroidx/recyclerview/widget/C;->a:Landroidx/recyclerview/widget/D;

    iget-object v2, v0, Landroidx/recyclerview/widget/D;->w:Landroidx/recyclerview/widget/D$h;

    iget v3, p1, Landroidx/recyclerview/widget/a$b;->b:I

    iget p1, p1, Landroidx/recyclerview/widget/a$b;->d:I

    invoke-virtual {v2, v0, v3, p1, v1}, Landroidx/recyclerview/widget/D$h;->a(Landroidx/recyclerview/widget/D;III)V

    goto :goto_0

    :cond_1
    iget-object v0, p0, Landroidx/recyclerview/widget/C;->a:Landroidx/recyclerview/widget/D;

    iget-object v1, v0, Landroidx/recyclerview/widget/D;->w:Landroidx/recyclerview/widget/D$h;

    iget v2, p1, Landroidx/recyclerview/widget/a$b;->b:I

    iget v3, p1, Landroidx/recyclerview/widget/a$b;->d:I

    iget-object p1, p1, Landroidx/recyclerview/widget/a$b;->c:Ljava/lang/Object;

    invoke-virtual {v1, v0, v2, v3, p1}, Landroidx/recyclerview/widget/D$h;->a(Landroidx/recyclerview/widget/D;IILjava/lang/Object;)V

    goto :goto_0

    :cond_2
    iget-object v0, p0, Landroidx/recyclerview/widget/C;->a:Landroidx/recyclerview/widget/D;

    iget-object v1, v0, Landroidx/recyclerview/widget/D;->w:Landroidx/recyclerview/widget/D$h;

    iget v2, p1, Landroidx/recyclerview/widget/a$b;->b:I

    iget p1, p1, Landroidx/recyclerview/widget/a$b;->d:I

    invoke-virtual {v1, v0, v2, p1}, Landroidx/recyclerview/widget/D$h;->b(Landroidx/recyclerview/widget/D;II)V

    goto :goto_0

    :cond_3
    iget-object v0, p0, Landroidx/recyclerview/widget/C;->a:Landroidx/recyclerview/widget/D;

    iget-object v1, v0, Landroidx/recyclerview/widget/D;->w:Landroidx/recyclerview/widget/D$h;

    iget v2, p1, Landroidx/recyclerview/widget/a$b;->b:I

    iget p1, p1, Landroidx/recyclerview/widget/a$b;->d:I

    invoke-virtual {v1, v0, v2, p1}, Landroidx/recyclerview/widget/D$h;->a(Landroidx/recyclerview/widget/D;II)V

    :goto_0
    return-void
.end method

.method public d(II)V
    .locals 2

    iget-object v0, p0, Landroidx/recyclerview/widget/C;->a:Landroidx/recyclerview/widget/D;

    const/4 v1, 0x1

    invoke-virtual {v0, p1, p2, v1}, Landroidx/recyclerview/widget/D;->a(IIZ)V

    iget-object p1, p0, Landroidx/recyclerview/widget/C;->a:Landroidx/recyclerview/widget/D;

    iput-boolean v1, p1, Landroidx/recyclerview/widget/D;->ua:Z

    iget-object p1, p1, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    iget v0, p1, Landroidx/recyclerview/widget/D$t;->d:I

    add-int/2addr v0, p2

    iput v0, p1, Landroidx/recyclerview/widget/D$t;->d:I

    return-void
.end method
