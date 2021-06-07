.class Landroidx/recyclerview/widget/A;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Landroidx/recyclerview/widget/O$b;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/recyclerview/widget/D;
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

    iput-object p1, p0, Landroidx/recyclerview/widget/A;->a:Landroidx/recyclerview/widget/D;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public a(Landroidx/recyclerview/widget/D$w;)V
    .locals 2

    iget-object v0, p0, Landroidx/recyclerview/widget/A;->a:Landroidx/recyclerview/widget/D;

    iget-object v1, v0, Landroidx/recyclerview/widget/D;->w:Landroidx/recyclerview/widget/D$h;

    iget-object p1, p1, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->l:Landroidx/recyclerview/widget/D$o;

    invoke-virtual {v1, p1, v0}, Landroidx/recyclerview/widget/D$h;->a(Landroid/view/View;Landroidx/recyclerview/widget/D$o;)V

    return-void
.end method

.method public a(Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$e$c;Landroidx/recyclerview/widget/D$e$c;)V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/A;->a:Landroidx/recyclerview/widget/D;

    invoke-virtual {v0, p1, p2, p3}, Landroidx/recyclerview/widget/D;->a(Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$e$c;Landroidx/recyclerview/widget/D$e$c;)V

    return-void
.end method

.method public b(Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$e$c;Landroidx/recyclerview/widget/D$e$c;)V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/A;->a:Landroidx/recyclerview/widget/D;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->l:Landroidx/recyclerview/widget/D$o;

    invoke-virtual {v0, p1}, Landroidx/recyclerview/widget/D$o;->c(Landroidx/recyclerview/widget/D$w;)V

    iget-object v0, p0, Landroidx/recyclerview/widget/A;->a:Landroidx/recyclerview/widget/D;

    invoke-virtual {v0, p1, p2, p3}, Landroidx/recyclerview/widget/D;->b(Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$e$c;Landroidx/recyclerview/widget/D$e$c;)V

    return-void
.end method

.method public c(Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$e$c;Landroidx/recyclerview/widget/D$e$c;)V
    .locals 2

    const/4 v0, 0x0

    invoke-virtual {p1, v0}, Landroidx/recyclerview/widget/D$w;->a(Z)V

    iget-object v0, p0, Landroidx/recyclerview/widget/A;->a:Landroidx/recyclerview/widget/D;

    iget-boolean v1, v0, Landroidx/recyclerview/widget/D;->N:Z

    if-eqz v1, :cond_0

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->W:Landroidx/recyclerview/widget/D$e;

    invoke-virtual {v0, p1, p1, p2, p3}, Landroidx/recyclerview/widget/D$e;->a(Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$e$c;Landroidx/recyclerview/widget/D$e$c;)Z

    move-result p1

    if-eqz p1, :cond_1

    goto :goto_0

    :cond_0
    iget-object v0, v0, Landroidx/recyclerview/widget/D;->W:Landroidx/recyclerview/widget/D$e;

    invoke-virtual {v0, p1, p2, p3}, Landroidx/recyclerview/widget/D$e;->c(Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$e$c;Landroidx/recyclerview/widget/D$e$c;)Z

    move-result p1

    if-eqz p1, :cond_1

    :goto_0
    iget-object p1, p0, Landroidx/recyclerview/widget/A;->a:Landroidx/recyclerview/widget/D;

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D;->s()V

    :cond_1
    return-void
.end method
