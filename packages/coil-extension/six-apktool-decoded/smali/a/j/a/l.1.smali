.class public abstract La/j/a/l;
.super La/j/a/j;
.source ""


# annotations
.annotation system Ldalvik/annotation/Signature;
    value = {
        "<E:",
        "Ljava/lang/Object;",
        ">",
        "La/j/a/j;"
    }
.end annotation


# instance fields
.field private final a:Landroid/app/Activity;

.field private final b:Landroid/content/Context;

.field private final c:Landroid/os/Handler;

.field private final d:I

.field final e:La/j/a/t;


# direct methods
.method constructor <init>(La/j/a/i;)V
    .locals 2

    iget-object v0, p1, La/j/a/i;->c:Landroid/os/Handler;

    const/4 v1, 0x0

    invoke-direct {p0, p1, p1, v0, v1}, La/j/a/l;-><init>(Landroid/app/Activity;Landroid/content/Context;Landroid/os/Handler;I)V

    return-void
.end method

.method constructor <init>(Landroid/app/Activity;Landroid/content/Context;Landroid/os/Handler;I)V
    .locals 1

    invoke-direct {p0}, La/j/a/j;-><init>()V

    new-instance v0, La/j/a/t;

    invoke-direct {v0}, La/j/a/t;-><init>()V

    iput-object v0, p0, La/j/a/l;->e:La/j/a/t;

    iput-object p1, p0, La/j/a/l;->a:Landroid/app/Activity;

    const-string p1, "context == null"

    invoke-static {p2, p1}, La/g/h/g;->a(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;

    check-cast p2, Landroid/content/Context;

    iput-object p2, p0, La/j/a/l;->b:Landroid/content/Context;

    const-string p1, "handler == null"

    invoke-static {p3, p1}, La/g/h/g;->a(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;

    check-cast p3, Landroid/os/Handler;

    iput-object p3, p0, La/j/a/l;->c:Landroid/os/Handler;

    iput p4, p0, La/j/a/l;->d:I

    return-void
.end method


# virtual methods
.method abstract a(La/j/a/g;)V
.end method

.method public abstract a(Ljava/lang/String;Ljava/io/FileDescriptor;Ljava/io/PrintWriter;[Ljava/lang/String;)V
.end method

.method b()Landroid/app/Activity;
    .locals 1

    iget-object v0, p0, La/j/a/l;->a:Landroid/app/Activity;

    return-object v0
.end method

.method public abstract b(La/j/a/g;)Z
.end method

.method c()Landroid/content/Context;
    .locals 1

    iget-object v0, p0, La/j/a/l;->b:Landroid/content/Context;

    return-object v0
.end method

.method d()La/j/a/t;
    .locals 1

    iget-object v0, p0, La/j/a/l;->e:La/j/a/t;

    return-object v0
.end method

.method e()Landroid/os/Handler;
    .locals 1

    iget-object v0, p0, La/j/a/l;->c:Landroid/os/Handler;

    return-object v0
.end method

.method public abstract f()Landroid/view/LayoutInflater;
.end method

.method public abstract g()I
.end method

.method public abstract h()Z
.end method

.method public abstract i()V
.end method
